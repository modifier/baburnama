import { writable } from 'svelte/store';
import {getDefaultLocale} from "./locale";

export const language = writable(getDefaultLocale());

export const page = writable(0);