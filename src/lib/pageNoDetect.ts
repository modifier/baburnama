import {content} from "./content";

export function getPageNo() {
  const fragment = location.hash.match(/page-(\d+)/);
  if (!fragment) {
    return 0;
  }

  return validatePageNo(parseInt(fragment[1], 10) - 1);
}

export function validatePageNo(pageNo) {
  const page = Math.min(pageNo, content.length - 1);
  if (page % 2 == 1) {
    return page - 1;
  } else {
    return page;
  }
}