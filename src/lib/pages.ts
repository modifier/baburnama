import {content} from "../content/content";

/**
 * Get the page number from the URL fragment.
 */
export function getPageFromUrl(): number {
  const fragment = location.hash.match(/page-(\d+)/);
  if (!fragment) {
    return 0;
  }

  return parseInt(fragment[1], 10) - 1;
}

/**
 * Get the page number from the URL fragment, or from local storage if not present.
 * Used once to define the contents of the page store.
 */
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

/**
 * Get the closest non-empty page to the current page. Used for mobile view, as we skip empty pages there.
 *
 * @param page - page number
 * @param direction - direction of looking
 * @param isMobile - if it's a mobile view
 */
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

/**
 * Get the page number to be displayed. On desktop, it should be always the even page number.
 *
 * @param pageNo - page number
 * @param isMobile - if it's a mobile view
 */
export function getVisiblePage(pageNo: number, isMobile: boolean): number {
  if (pageNo % 2 == 1 && !isMobile) {
    return pageNo - 1;
  } else {
    return pageNo;
  }
}