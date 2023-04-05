import {content} from "../content/content";

export function getPageFromUrl(): number {
  const fragment = location.hash.match(/page-(\d+)/);
  if (!fragment) {
    return 0;
  }

  return parseInt(fragment[1], 10) - 1;
}

export function getDefaultPage(): number {
  let fragmentPageNo = getPageFromUrl();
  if (fragmentPageNo) {
    return fragmentPageNo;
  } else {
    const storagePage = localStorage.getItem("pageNo");
    if (storagePage) {
      return parseInt(storagePage);
    }
  }

  return 0;
}

export function getClosestNonEmptyPage(page: number, direction: 'forward' | 'back', isMobile: boolean): number {
  if (!isMobile) {
    return page;
  }

  let newPage = page;
  let directionIncrement = direction === 'forward' ? 1 : -1;
  while (newPage >= 0 && newPage < content.length) {
    if (content[newPage].type !== 'empty') {
      return newPage;
    }
    newPage += directionIncrement;
  }
  return page;
}

export function getVisiblePage(pageNo: number, isMobile: boolean): number {
  if (pageNo % 2 == 1 && !isMobile) {
    return pageNo - 1;
  } else {
    return pageNo;
  }
}