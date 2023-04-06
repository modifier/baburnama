import {readable, writable} from 'svelte/store';
import {getDefaultLanguage} from "./lib/language";
import {getDefaultPage} from "./lib/pages";

/**
 * Stores the selected language.
 */
export const language = writable(getDefaultLanguage());

/**
 * Stores the selected page.
 */
export const page = writable(getDefaultPage());

/**
 * Stores if it's a mobile view and changes its content on window resize.
 */
export const isMobile = readable(false, function(set) {
  let checkSize = () => {
    set(window.matchMedia("(max-width: 800px)").matches);
  };
  checkSize();

  window.addEventListener('resize', checkSize);

  return () => {
    window.removeEventListener('resize', checkSize)
  };
});

/**
 * Check if the site has a hover device like a mouse.
 * If not, navigation via swiping is disabled.
 */
export const isHoverDevice = readable(false, function(set) {
  let checkDevice = () => {
    set(window.matchMedia("(hover: hover)").matches)
  };

  checkDevice();
})