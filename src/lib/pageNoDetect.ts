import {content} from "./content";

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
    return fragmentPageNo;
  } else {
    const storagePage = localStorage.getItem("pageNo");
    if (storagePage) {
      return parseInt(storagePage);
    }
  }

  return 0;
}

export function validatePageNo(pageNo) {
  const page = Math.min(pageNo, content.length - 1);
  if (page % 2 == 1) {
    return page - 1;
  } else {
    return page;
  }
}