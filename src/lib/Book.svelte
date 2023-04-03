<script lang="ts">
  import Codex from "./Codex.svelte";
  import {OpeningType} from "./types";
  import {content} from "./content";
  import Page from "./Page.svelte";
  import {getPageNoFromUrl, validatePageNo} from "./pageNoDetect";
  import LanguagePicker from "./LanguagePicker.svelte";
  import {page} from "./stores";
  import {language} from "./stores.js";
  import {staticLang} from "./static-lang.js";

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
    if (direction === 'back' && hasBack) {
      page.set(currentPageNo - 2);
    } else if (direction === 'forward' && hasForward) {
      page.set(currentPageNo + 2);
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
    const validatedNo = validatePageNo(pageNo);
    if (validatedNo !== pageNo) {
      page.set(validatedNo);
      return;
    }
    newPageNo = pageNo;
    if (initialOpening) {
      initialOpening = false;
      currentPageNo = pageNo;
      return;
    }
    preloadPageImages(pageNo + 2);
    preloadPageImages(pageNo + 3);
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
    hasBack = currentPageNo > 0;
    hasForward = currentPageNo < content.length - 2;
  }
</script>

<svelte:window on:popstate={popFromHistory} />
<div class="codex-wrapper">
  <div class="codex-toolbar">
    <div class="table-of-contents toolbar-bookmark" class:toolbar-bookmark--hidden={content[$page].hideTableOfContents}>
      <button class="bookmark" on:click={gotoTableOfContents}>{staticLang.tableOfContents[$language]}</button>
    </div>
    <div class="language-picker toolbar-bookmark" class:toolbar-bookmark--hidden={content[$page].hideLanguagePicker}>
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
        <Page page={newPageNo} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="back-2">
      {#if hasBack}
        <Page page={newPageNo + 1} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="middle-1">
      <Page page={currentPageNo} />
    </svelte:fragment>
    <svelte:fragment slot="middle-2">
      <Page page={currentPageNo + 1} />
    </svelte:fragment>
    <svelte:fragment slot="forward-1">
      {#if hasForward}
        <Page page={newPageNo} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="forward-2">
      {#if hasForward}
        <Page page={newPageNo + 1} />
      {/if}
    </svelte:fragment>
  </Codex>
</div>

<style lang="scss">
  .codex-wrapper {
    max-height: 95%;
    max-width: min(95%, 1640px);
    min-width: 600px;
    position: absolute;
    inset: 0;
    margin: auto;
    aspect-ratio: 1.6 / 1.05;
    display: flex;
    flex-direction: column;
  }

  .codex-toolbar {
    width: 100%;
    aspect-ratio: 1.6 / 0.05;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    bottom: -6px;
  }

  .toolbar-bookmark {
    transition: 0.3s opacity;
    &--hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>