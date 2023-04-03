import { writable } from 'svelte/store';
import {getDefaultLocale} from "./locale";
import {getPageNo} from "./pageNoDetect";

export const language = writable(getDefaultLocale());

export const page = writable(getPageNo());
