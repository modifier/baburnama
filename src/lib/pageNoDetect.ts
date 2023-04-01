import {content} from "./content";

export function getPageNo() {
  const fragment = location.hash.match(/page-(\d+)/);
  if (!fragment) {
    return 0;
  }

  const page = Math.min(parseInt(fragment[1], 10) - 1, content.length - 1);
  if (page % 2 == 1) {
    return page - 1;
  } else {
    return page;
  }
}