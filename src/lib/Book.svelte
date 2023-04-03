<script lang="ts">
  import Codex from "./Codex.svelte";
  import {OpeningType} from "./types";
  import {content} from "./content";
  import Page from "./Page.svelte";
  import {getPageNoFromUrl} from "./pageNoDetect";
  import LanguagePicker from "./LanguagePicker.svelte";
  import {isMobile, page} from "./stores";
  import {language} from "./stores.js";
  import {staticLang} from "./static-lang.js";
  import {getVisiblePageNo} from "./pageNoDetect.js";

  let currentPageNo = 0;
  let newPageNo = 0;
  let opening = OpeningType.MIDDLE;
  let hasBack = true;
  let hasForward = true;
  let doNotPushState = false;
  let isTurning = false;
  let initialOpening = true;

  function handlePageTurned() {
    if (!doNotPushState) {
      history.pushState(null, null, `#page-${$page + 1}`);
      localStorage.setItem("pageNo", $page.toString());
    } else {
      doNotPushState = false;
    }
    currentPageNo = newPageNo;
    isTurning = false;
    opening = OpeningType.MIDDLE;
  }

  function handlePageTurning({ detail: { direction }}) {
    const size = $isMobile ? 1 : 2;
    if (direction === 'back' && hasBack) {
      let newPage = currentPageNo - size;
      if ($isMobile && content[newPage].type === 'empty') {
        newPage -= 1;
      }
      page.set(newPage);
    } else if (direction === 'forward' && hasForward) {
      page.set(currentPageNo + size);
    }
  }

  function preloadPageImages(page: number) {
    const nextPage = content[page];
    if (nextPage && nextPage.img) {
      const img = new Image();
      img.src = `/book/boburnama-${nextPage.img}.jpg`;
    }
  }

  page.subscribe((pageNo) => {
    const validatedNo = Math.max(0, Math.min(pageNo, content.length - 1));
    if (validatedNo !== pageNo) {
      page.set(validatedNo);
      return;
    }

    if ($isMobile && content[validatedNo].type === 'empty') {
      page.set(validatedNo + 1);
      return;
    }

    newPageNo = pageNo;
    if (initialOpening) {
      initialOpening = false;
      currentPageNo = pageNo;
      return;
    }
    if (!$isMobile) {
      preloadPageImages(pageNo + 2);
      preloadPageImages(pageNo + 3);
    } else {
      preloadPageImages(pageNo + 1);
    }
    isTurning = true;
    setTimeout(() => {
      if (pageNo > currentPageNo) {
        opening = OpeningType.FORWARD;
      } else if (pageNo < currentPageNo) {
        opening = OpeningType.BACK;
      }
    });
  });

  function popFromHistory() {
    doNotPushState = true;
    page.set(getPageNoFromUrl());
  }

  function gotoTableOfContents() {
    const tableOfContentsPage = content.findIndex((page) => page.type === "tableOfContents");
    page.set(tableOfContentsPage);
  }

  $: {
    hasBack = currentPageNo > 1;
    hasForward = currentPageNo < content.length - ($isMobile ? 1 : 2);
  }
</script>

<svelte:window on:popstate={popFromHistory} />
<div class="codex-wrapper">
  <div class="codex-toolbar">
    <div class="toolbar-bookmark" class:toolbar-bookmark--hidden={content[$page].hideTableOfContents}>
      <button class="bookmark" on:click={gotoTableOfContents}>
        <img src="/globe.png" class="globe-icon" />
        <span>{staticLang.tableOfContents[$language]}</span>
      </button>
    </div>
    <div class="language-picker-bookmark toolbar-bookmark"
         class:toolbar-bookmark--hidden={content[$page].hideLanguagePicker}
         class:toolbar-bookmark--hidden-desktop={content[$page].hideLanguagePickerDesktop}
    >
      <LanguagePicker variant="bookmark" />
    </div>
  </div>
  <Codex on:pageTurning={handlePageTurning}
         on:pageTurned={handlePageTurned}
         bind:isTurning={isTurning}
         bind:opening={opening}
         hasBack={hasBack}
         hasForward={hasForward}
  >
    <svelte:fragment slot="back-1">
      {#if hasBack}
        <Page page={getVisiblePageNo(newPageNo, $isMobile)} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="back-2">
      {#if hasBack}
        <Page page={getVisiblePageNo(newPageNo, $isMobile) + 1} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="middle-1">
      <Page page={getVisiblePageNo(currentPageNo, $isMobile)} />
    </svelte:fragment>
    <svelte:fragment slot="middle-2">
      <Page page={getVisiblePageNo(currentPageNo, $isMobile) + 1} />
    </svelte:fragment>
    <svelte:fragment slot="forward-1">
      {#if hasForward}
        <Page page={getVisiblePageNo(newPageNo, $isMobile)} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="forward-2">
      {#if hasForward}
        <Page page={getVisiblePageNo(newPageNo, $isMobile) + 1} />
      {/if}
    </svelte:fragment>
  </Codex>
</div>

<style lang="scss">
  :global {
    body.mobile {
      .codex-wrapper {
        max-height: 100%;
        max-width: 100%;
        aspect-ratio: auto;
      }

      .codex-toolbar {
        width: 100%;
        aspect-ratio: 1 / 0.1;
      }
    }
  }

  .codex-wrapper {
    max-height: 95%;
    max-width: min(95%, 1640px);
    position: absolute;
    inset: 0;
    margin: auto;
    aspect-ratio: 1.6 / 1.05;
    display: flex;
    flex-direction: column;
  }

  :global {
    body.mobile {
      .language-picker-bookmark {
        display: none;
      }
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
  }

  body:not(.mobile) {
    .toolbar-bookmark--hidden-desktop {
      opacity: 0;
      pointer-events: none;
    }

    .globe-icon {
      display: none;
    }
  }

  .globe-icon {
    height: 1em;
    margin-right: 0.2em;
  }

  .toolbar-bookmark {
    transition: 0.3s opacity;
    &--hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>