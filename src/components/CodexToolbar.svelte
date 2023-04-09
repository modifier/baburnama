<script lang="ts">
  import LanguagePicker from "./LanguagePicker.svelte";
  import {language, page} from "../stores.js";
  import {staticLang} from "../content/static-lang.js";
  import {content} from "../content/content.js";
  import type {PageContent} from "../content/content.js";
  import {Page} from "../lib/page";

  let pageContent: PageContent;
  function gotoTableOfContents() {
    const tableOfContentsPage = content.findIndex((page) => page.type === "tableOfContents");
    page.set(new Page(tableOfContentsPage, 'page'));
  }

  $: pageContent = $page.getPageContent();
</script>

<div class="codex-toolbar">
  <div class="codex-toolbar__bookmark"
       class:codex-toolbar__bookmark--hidden={pageContent.hideTableOfContents}
       class:codex-toolbar__bookmark--hidden-desktop={pageContent.hideTableOfContentsDesktop}>
    <button class="bookmark" on:click={gotoTableOfContents}>
      <img src="/globe.png" class="globe-icon" />
      <span>{staticLang.tableOfContents[$language]}</span>
    </button>
  </div>
  <div class="codex-toolbar__language-picker-bookmark codex-toolbar__bookmark"
       class:toolbar-bookmark--hidden={pageContent.hideLanguagePicker}
  >
    <LanguagePicker variant="bookmark" />
  </div>
</div>

<style lang="scss">
  @media screen and (max-width: 800px) {
    .codex-toolbar__language-picker-bookmark {
      display: none;
    }
  }

  .codex-toolbar {
    width: 100%;
    aspect-ratio: 1.6 / 0.05;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 16px;
    box-sizing: border-box;
    position: relative;
    bottom: -6px;

    @media screen and (max-width: 800px) {
      width: 100%;
      aspect-ratio: 1 / 0.1;
    }

    &__bookmark {
      transition: 0.3s opacity;
      &--hidden {
        opacity: 0;
        pointer-events: none;
      }
      &--hidden-desktop {
        @media screen and (min-width: 801px) {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  }

  .globe-icon {
    height: 1em;
    margin-right: 0.2em;

    @media screen and (min-width: 801px) {
      display: none;
    }
  }
</style>