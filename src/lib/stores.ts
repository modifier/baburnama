import {readable, writable} from 'svelte/store';
import {getDefaultLocale} from "./locale";
import {getPageNo} from "./pageNoDetect";

export const language = writable(getDefaultLocale());

export const page = writable(getPageNo());

export const isMobile = readable(false, function start(set) {
  let checkSize = () => {
    set(window.matchMedia("(max-width: 800px)").matches);
  };
  checkSize();

  window.addEventListener('resize', checkSize);

  return () => {
    window.removeEventListener('resize', checkSize)
  };
});