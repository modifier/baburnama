<script lang="ts">
  import Codex from "./Codex.svelte";
  import {OpeningType} from "./types";
  import {content} from "./content";
  import Page from "./Page.svelte";

  let pageNo = 2;
  let opening = OpeningType.MIDDLE;
  let hasBack = false;
  let hasForward = false;

  function handlePageTurned() {
    if (opening === OpeningType.BACK) {
      pageNo -= 2;
    } else if (opening === OpeningType.FORWARD) {
      pageNo += 2;
    }
    opening = OpeningType.MIDDLE;
  }

  $: if (pageNo > 0) {
    hasBack = true;
  } else {
    hasBack = false;
  }

  if (pageNo < content.length - 1) {
    hasForward = true;
  } else {
    hasForward = false;
  }
</script>

<Codex on:pageTurned={handlePageTurned} bind:pageNo={opening} hasBack={hasBack} hasForward={hasForward}>
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