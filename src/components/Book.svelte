<script lang="ts">
  import Codex from "./Codex.svelte";
  import {Opening} from "../types";
  import PageComponent from "./Page.svelte";
  import {isHoverDevice, isMobile, page} from "../stores";
  import CodexToolbar from "./CodexToolbar.svelte";
  import {preloadPageImages} from "../lib/preload";
  import { swipe } from 'svelte-gestures';
  import {Page} from "../lib/page";

  let currentPage: Page = new Page(0, 'page');
  let newPage: Page = new Page(0, 'page');
  let opening = Opening.MIDDLE;
  let doNotPushState = false;
  let isTurning = false;
  let initialOpening = true;

  function handlePageTurned() {
    currentPage = newPage;
  }

  function startTurningPage(direction: 'back' | 'forward') {
    const size = $isMobile ? 1 : 2;
    let sizeDirection = 0;
    if (direction === 'back' && hasBack) {
      sizeDirection = -1;
    } else if (direction === 'forward' && hasForward) {
      sizeDirection = 1;
    }
    page.set(currentPage.addPage(size * sizeDirection));
  }

  function handleSwipe({ detail: { direction }}) {
    if ($isHoverDevice) {
      return;
    }
    const bookDirection = direction === 'left' ? 'forward' : (direction === 'right' ? 'back' : null);
    if (bookDirection) {
      startTurningPage(bookDirection);
    }
  }

  function handlePageTurning({ detail: { direction }}) {
    startTurningPage(direction);
  }

  function preloadOpeningImages(page: PageComponent): void {
    let directionPages;
    if (!$isMobile) {
      directionPages = opening == Opening.FORWARD ? [2, 3] : [-2, -1];
    } else {
      directionPages = opening == Opening.FORWARD ? [1] : [-1];
    }

    for (let direction of directionPages) {
      preloadPageImages(page.addPage(direction));
    }
  }

  page.subscribe((pageObj: Page) => {
    // Sometimes there is a case when animation is not triggered, then we'll have to reset currentPage manually
    if (!currentPage.equals(newPage)) {
      console.log('PAGE [reset]: current page manually')
      handlePageTurned();
      return;
    }

    const compareResult = pageObj.compare(currentPage);

    const direction = compareResult >= 0 ? 'forward' : 'back';
    let validatedPage = pageObj.getValidPage()
      .getVisiblePage($isMobile)
      .getClosestNonEmptyPage($isMobile, direction);

    if (!validatedPage.equals(pageObj)) {
      page.set(validatedPage);
      return;
    }

    if (compareResult === 0) {
      initialOpening = false;
      return;
    }

    newPage = pageObj;
    if (initialOpening) {
      initialOpening = false;
      currentPage = pageObj;
      return;
    }

    if (!doNotPushState) {
      newPage.pushToHistory();
      newPage.toLocalStorage();
    } else {
      doNotPushState = false;
    }

    if (direction == 'forward') {
      opening = Opening.FORWARD;
    } else if (direction === 'back') {
      opening = Opening.BACK;
    }

    preloadOpeningImages(pageObj);
  });

  function popFromHistory() {
    doNotPushState = true;
    isTurning = false;
    page.set(Page.fromUrl(location.hash));
  }

  let hasBack = true;
  let hasForward = true;

  $: {
    hasBack = currentPage.hasBack();
    hasForward = currentPage.hasForward();
  }
</script>

<svelte:window on:popstate={popFromHistory} />
<div class="codex-wrapper"
     use:swipe={{ timeframe: 300, minSwipeDistance: 100 }}
     on:swipe={handleSwipe}>
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
        <PageComponent page={newPage.getVisiblePage($isMobile)} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="back-2">
      {#if hasBack}
        <PageComponent page={newPage.getVisiblePage($isMobile).addPage(1)} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="middle-1">
      <PageComponent page={currentPage.getVisiblePage($isMobile)} />
    </svelte:fragment>
    <svelte:fragment slot="middle-2">
      <PageComponent page={currentPage.getVisiblePage($isMobile).addPage(1)} />
    </svelte:fragment>
    <svelte:fragment slot="forward-1">
      {#if hasForward}
        <PageComponent page={newPage.getVisiblePage($isMobile)} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="forward-2">
      {#if hasForward}
        <PageComponent page={newPage.getVisiblePage($isMobile).addPage(1)} />
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