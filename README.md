# Baburnama

This project uses Svelte as a framework. If you're not familiar with it, you might want to check its website: https://svelte.dev

## Project structure

The project is structured as follows:

- `src`
  - `main.ts` - the entry point of the app
  - `App.svelte` - the entry point of the Svelte app
  - `stores.ts` - public stores of the application (see [svelte/store](https://svelte.dev/docs#run-time-svelte-store))
  - `types.ts` - typescript types
  - `assets` - static assets, like the background or the font
  - `components` - reusable components
    - `Book.svelte` - manages the page turn effect
    - `Codex.svelte` - contains the visual representation of the book and its cover
    - `CodexToolbar.svelte` - contains links to the table of contents and the language picker
    - `LanguagePicker.svelte` - allows the user to switch between the languages
    - `Page.svelte` - contains the contents of the page
    - `pages`
      - `Regular.svelte` - represents a regular page that can have an image, a text, or both
      - `Credits.svelte` - represents the credits page
      - `TableOfContents.svelte` - represents the table of contents
      - `Titular.svelte` - represents the very first page with the book name, and the last page with "to be continued"
    - `content` - folder with the static content of the book
      - `content.ts` - the contents of Baburnama itself
      - `static-lang.ts` - some static strings that are used in the app that are not the part of the book itself
      - `appendix.ts` - the contents of the book appendix (not implemented yet)
    - `lib`
      - `language.ts` - contains the language detection utility function
      - `pages.ts` - contains utility functions related to the pages
      - `preload.ts` - contains the utility function that preloads images

## Sources

Page turn effect: https://codepen.io/diemoritat/pen/LKROYZ

Paper: https://codepen.io/TheMOZZARELLA/pen/pormjbw

Background: https://www.pexels.com/photo/desert-during-nighttime-847402/ by Walid Ahmad

Font: https://www.andrewmarcus.ru/projects/fonts/pehlevi/

## Additional links

Book effects: https://blog.avada.io/css/book-effects