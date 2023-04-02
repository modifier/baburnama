<script lang="ts">
  import Codex from "./Codex.svelte";
  import {OpeningType} from "./types";
  import {content} from "./content";
  import Page from "./Page.svelte";
  import {getPageNo} from "./pageNoDetect";
  import LanguagePicker from "./LanguagePicker.svelte";

  export let pageNo = 0;
  let opening = OpeningType.MIDDLE;
  let hasBack = false;
  let hasForward = false;
  let doNotPushState = false;

  function handlePageTurned() {
    if (opening === OpeningType.BACK && hasBack) {
      pageNo -= 2;
    } else if (opening === OpeningType.FORWARD && hasForward) {
      pageNo += 2;
    }
    if (!doNotPushState) {
      history.pushState(null, null, `#page-${pageNo + 1}`);
    } else {
      doNotPushState = false;
    }
    opening = OpeningType.MIDDLE;
    localStorage.setItem("pageNo", pageNo.toString());
  }

  function updatePageNo() {
    const newPageNo = getPageNo();
    if (newPageNo > pageNo) {
      opening = OpeningType.FORWARD;
      pageNo = newPageNo - 2;
    }
    if (newPageNo < pageNo) {
      opening = OpeningType.BACK;
      pageNo = newPageNo + 2;
    }
    doNotPushState = true;
  }

  $: {
    hasBack = pageNo > 0;
    hasForward = pageNo < content.length - 2;
  }
</script>

<svelte:window on:popstate={updatePageNo} />
<div class="codex-wrapper">
  <div class="codex-toolbar">
    <div class="language-picker" class:language-picker--hidden={content[pageNo].hideLanguagePicker}>
      <LanguagePicker variant="bookmark" />
    </div>
  </div>
  <Codex on:pageTurned={handlePageTurned} bind:opening={opening} hasBack={hasBack} hasForward={hasForward}>
    <div slot="back-1">
      {#if hasBack}
        <Page page={pageNo - 2} />
      {/if}
    </div>
    <div slot="back-2">
      {#if hasBack}
        <Page page={pageNo - 1} />
      {/if}
    </div>
    <div slot="middle-1">
      <Page page={pageNo} />
    </div>
    <div slot="middle-2">
      <Page page={pageNo + 1} />
    </div>
    <div slot="forward-1">
      {#if hasForward}
        <Page page={pageNo + 2} />
      {/if}
    </div>
    <div slot="forward-2">
      {#if hasForward}
        <Page page={pageNo + 3} />
      {/if}
    </div>
  </Codex>
</div>

<style lang="scss">
  .codex-wrapper {
    max-height: 95%;
    max-width: 95%;
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
    justify-content: flex-end;
    padding: 0 16px;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    bottom: -6px;
  }

  .language-picker {
    transition: 0.3s opacity;
    &--hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
</style>