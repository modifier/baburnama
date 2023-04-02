<script lang="ts">
  import Codex from "./Codex.svelte";
  import {OpeningType} from "./types";
  import {content} from "./content";
  import Page from "./Page.svelte";
  import {getPageNo} from "./pageNoDetect";
  import LanguagePicker from "./LanguagePicker.svelte";
  import {page} from "./stores";

  export let pageNo = 0;
  let opening = OpeningType.MIDDLE;
  let hasBack = false;
  let hasForward = false;
  let doNotPushState = false;

  function handlePageTurned() {
    if (opening === OpeningType.BACK && hasBack) {
      page.set($page - 2);
    } else if (opening === OpeningType.FORWARD && hasForward) {
      page.set($page + 2);
    }
    if (!doNotPushState) {
      history.pushState(null, null, `#page-${$page + 1}`);
    } else {
      doNotPushState = false;
    }
    opening = OpeningType.MIDDLE;
    localStorage.setItem("pageNo", $page.toString());
  }

  function updatePageNo() {
    const newPageNo = getPageNo();
    if (newPageNo > $page) {
      opening = OpeningType.FORWARD;
      page.set(newPageNo - 2);
    }
    if (newPageNo < $page) {
      opening = OpeningType.BACK;
      page.set(newPageNo + 2);
    }
    doNotPushState = true;
  }

  $: {
    hasBack = $page > 0;
    hasForward = $page < content.length - 2;
  }
</script>

<svelte:window on:popstate={updatePageNo} />
<div class="codex-wrapper">
  <div class="codex-toolbar">
    <div class="language-picker" class:language-picker--hidden={content[$page].hideLanguagePicker}>
      <LanguagePicker variant="bookmark" />
    </div>
  </div>
  <Codex on:pageTurned={handlePageTurned} bind:opening={opening} hasBack={hasBack} hasForward={hasForward}>
    <svelte:fragment slot="back-1">
      {#if hasBack}
        <Page page={$page - 2} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="back-2">
      {#if hasBack}
        <Page page={$page - 1} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="middle-1">
      <Page page={$page} />
    </svelte:fragment>
    <svelte:fragment slot="middle-2">
      <Page page={$page + 1} />
    </svelte:fragment>
    <svelte:fragment slot="forward-1">
      {#if hasForward}
        <Page page={$page + 2} />
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="forward-2">
      {#if hasForward}
        <Page page={$page + 3} />
      {/if}
    </svelte:fragment>
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