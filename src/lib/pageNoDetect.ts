export function getPageNoFromUrl() {
  const fragment = location.hash.match(/page-(\d+)/);
  if (!fragment) {
    return 0;
  }

  return parseInt(fragment[1], 10) - 1;
}

export function getPageNo() {
  let fragmentPageNo = getPageNoFromUrl();
  if (fragmentPageNo) {
    return fragmentPageNo - 1;
  } else {
    const storagePage = localStorage.getItem("pageNo");
    if (storagePage) {
      return parseInt(storagePage);
    }
  }

  return 0;
}

export function getVisiblePageNo(pageNo, isMobile) {
  if (pageNo % 2 == 1 && !isMobile) {
    return pageNo - 1;
  } else {
    return pageNo;
  }
}