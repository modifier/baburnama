<script lang="ts">
  import Codex from "./Codex.svelte";
  import {Opening} from "../types";
  import {content} from "../content/content";
  import Page from "./Page.svelte";
  import {getClosestNonEmptyPage, getPageFromUrl} from "../lib/pages";
  import {isMobile, page} from "../stores";
  import {getVisiblePage} from "../lib/pages.js";
  import CodexToolbar from "./CodexToolbar.svelte";
  import {preloadPageImages} from "../lib/preload";

  let currentPageNo = 0;
  let newPageNo = 0;
  let opening = Opening.MIDDLE;
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
    opening = Opening.MIDDLE;
  }

  function handlePageTurning({ detail: { direction }}) {
    const size = $isMobile ? 1 : 2;
    let newPage = currentPageNo;
    if (direction === 'back' && hasBack) {
      newPage -= size;
    } else if (direction === 'forward' && hasForward) {
      newPage += size;
    }
    newPage = getClosestNonEmptyPage(newPage, direction, $isMobile);
    newPage = getVisiblePage(newPage, $isMobile);
    page.set(newPage);
  }

  function preloadOpeningImages(pageNo: number, direction: 'forward' | 'back'): void {
    if (!$isMobile) {
      const directionPages = direction === 'forward' ? [2, 3] : [-2, -1];
      preloadPageImages(pageNo + directionPages[0]);
      preloadPageImages(pageNo + directionPages[1]);
    } else {
      const directionIncrement = direction === 'forward' ? 1 : -1;
      preloadPageImages(pageNo + directionIncrement);
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

    preloadOpeningImages(pageNo, currentPageNo < pageNo ? 'forward' : 'back');

    isTurning = true;
    setTimeout(() => {
      if (pageNo > currentPageNo) {
        opening = Opening.FORWARD;
      } else if (pageNo < currentPageNo) {
        opening = Opening.BACK;
      }
    });
  });

  function popFromHistory() {
    doNotPushState = true;
    page.set(getPageFromUrl());
  }

  let hasBack = true;
  let hasForward = true;

  $: {
    hasBack = currentPageNo > 1;
    hasForward = currentPageNo < content.length - 1;
  }
</script>

<svelte:window on:popstate={popFromHistory} />
<div class="codex-wrapper">
  <CodexToolbar />
  <Codex on:pageTurning={handlePageTurning}
         on:pageTurned={handlePageTurned}
         bind:isTurning={isTurning}
         bind:opening={opening}
         hasBack={hasBack}
         hasForward={hasForward}
  >
    <svelte:fragment slot="back-1">
      {#if hasBack}
        <Page page={getVisiblePage(newPageNo, $isMobile)} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="back-2">
      {#if hasBack}
        <Page page={getVisiblePage(newPageNo, $isMobile) + 1} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="middle-1">
      <Page page={getVisiblePage(currentPageNo, $isMobile)} />
    </svelte:fragment>
    <svelte:fragment slot="middle-2">
      <Page page={getVisiblePage(currentPageNo, $isMobile) + 1} />
    </svelte:fragment>
    <svelte:fragment slot="forward-1">
      {#if hasForward}
        <Page page={getVisiblePage(newPageNo, $isMobile)} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="forward-2">
      {#if hasForward}
        <Page page={getVisiblePage(newPageNo, $isMobile) + 1} />
      {/if}
    </svelte:fragment>
  </Codex>
</div>

<style lang="scss">
  .codex-wrapper {
    max-height: 95%;
    max-width: min(95%, 1640px);
    position: absolute;
    inset: 0;
    margin: auto;
    aspect-ratio: 1.6 / 1.05;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 800px) {
      max-height: 100%;
      max-width: 100%;
      aspect-ratio: auto;
    }
  }
</style>