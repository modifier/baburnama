import {readable, writable} from 'svelte/store';
import {getDefaultLanguage} from "./lib/language";
import {getDefaultPage} from "./lib/pages";

export const language = writable(getDefaultLanguage());

export const page = writable(getDefaultPage());

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