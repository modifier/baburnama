import {readable, writable} from 'svelte/store';
import {getDefaultLocale} from "./locale";
import {getPageNo} from "./pageNoDetect";

export const language = writable(getDefaultLocale());

export const page = writable(getPageNo());

export const isMobile = readable(true, function start(set) {
  set(true);
});