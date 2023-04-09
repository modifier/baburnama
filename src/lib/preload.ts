import type {Page} from "./page";

/**
 * Preload the next page image.
 *
 * @param page - Page object
 */
export function preloadPageImages(page: Page) {
  const pageContent = page.getPageContent();
  if (pageContent && pageContent.type === 'regular' && pageContent.img) {
    const img = new Image();
    img.src = `/book/boburnama-${pageContent.img}.jpg`;
  }
}