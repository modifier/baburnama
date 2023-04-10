import {appendix} from "../content/appendix";
import {content} from "../content/content";
import type {PageContent} from "../content/content";
import {convertArabicIntoRoman} from "./roman";

export type PlainPage = {
  page: number;
  type: 'appdx' | 'page';
}

export class Page {
  private readonly page: number;
  private readonly type: 'page' | 'appdx';

  constructor(page: number | PlainPage, type?: 'page' | 'appdx') {
    if (typeof page === 'object') {
      this.page = page.page;
      this.type = page.type;
      return;
    }
    this.page = page;
    this.type = type;
  }

  /**
   * Get the page number from the URL fragment, or from local storage if not present.
   * Used once to define the contents of the page store.
   */
  static getDefaultPage(): Page {
    const fragmentPageNo = Page.fromUrl(location.hash);
    if (fragmentPageNo) {
      return fragmentPageNo.getValidPage();
    }

    return Page.fromLocalStorage().getValidPage();
  }

  static fromLocalStorage(): Page {
    const page = localStorage.getItem('page');
    if (page) {
      try {
        return new Page(JSON.parse(page));
      } finally { }
    }

    // backwards compatibility
    const storagePageNo = localStorage.getItem("pageNo");
    if (storagePageNo) {
      return new Page(parseInt(storagePageNo), 'page')
    }
    return new Page(0, 'page');
  }

  static fromUrl(url: string): Page {
    const pageFragment = url.match(/page-(\d+)/);
    if (pageFragment) {
      return new Page(parseInt(pageFragment[1], 10) - 1, 'page');
    }

    const appdxFragment = location.hash.match(/appdx-(\d+)/);
    if (appdxFragment) {
      return new Page(parseInt(appdxFragment[1], 10) - 1, 'appdx');
    }

    return new Page(0, 'page');
  }

  toLocalStorage(): void {
    localStorage.setItem('page', JSON.stringify(this));
  }

  toUrl(): string {
    return `#${this.type}-${this.page + 1}`;
  }

  pushToHistory(): void {
    history.pushState(null, '', this.toUrl());
  }

  addPage(increment: number): Page {
    let totalPage = this.page + increment;
    if (this.type === 'page' && totalPage >= content.length) {
      return new Page(totalPage - content.length, 'appdx');
    }
    if (this.type === 'appdx' && totalPage < 0) {
      return new Page(content.length + totalPage, 'page');
    }
    return new Page(totalPage, this.type);
  }

  equals(page: Page) {
    return this.page === page.page && this.type === page.type;
  }

  compare(page: Page) {
    if (this.type === 'page' && page.type === 'appdx') {
      return -1;
    }
    if (this.type === 'appdx' && page.type === 'page') {
      return 1;
    }
    return this.page - page.page;
  }

  hasBack(): boolean {
    if (this.type === 'appdx') {
      return true;
    }

    return this.page > 0;
  }

  hasForward(): boolean {
    if (this.type === 'page') {
      return true;
    }

    return this.page < appendix.length - 1;
  }

  getValidPage(): Page {
    const validPageNo = Math.max(0, Math.min(this.page, (this.type === 'page' ? content : appendix).length - 1));
    const validType = this.type !== 'appdx' ? 'page' : 'appdx';
    if (validPageNo !== this.page || validType !== this.type) {
      return new Page(validPageNo, validType);
    }
    return this;
  }

  getVisiblePage(isMobile: boolean): Page {
    if (this.page % 2 == 1 && !isMobile) {
      return this.addPage(-1);
    } else {
      return this;
    }
  }

  getClosestNonEmptyPage(isMobile: boolean, direction: 'forward' | 'back'): Page {
    if (!isMobile) {
      return this;
    }

    let newPage = this.page;
    let directionIncrement = direction === 'forward' ? 1 : -1;
    while (newPage >= 0 && newPage < content.length) {
      if (content[newPage].type !== 'empty') {
        return new Page(newPage, this.type);
      }
      newPage += directionIncrement;
    }
    return this;
  }

  getPageContent(): PageContent {
    if (this.type === 'page') {
      return content[this.page];
    }
    return appendix[this.page];
  }

  getDisplayPage(): string {
    if (this.type === 'page') {
      return (this.page + 1).toString();
    }
    return convertArabicIntoRoman(this.page + 1);
  }
}