import {content} from "../content/content";

/**
 * Preload the next page image.
 * @param page - page number
 */
export function preloadPageImages(page: number) {
  const nextPage = content[page];
  if (nextPage && nextPage.type === 'regular' && nextPage.img) {
    const img = new Image();
    img.src = `/book/boburnama-${nextPage.img}.jpg`;
  }
}