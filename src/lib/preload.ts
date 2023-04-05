import {content} from "../content/content";

export function preloadPageImages(page: number) {
  const nextPage = content[page];
  if (nextPage && (nextPage.type === 'regular' || nextPage.type === 'image') && nextPage.img) {
    const img = new Image();
    img.src = `/book/boburnama-${nextPage.img}.jpg`;
  }
}