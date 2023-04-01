<script lang="ts">
  import Codex from "./Codex.svelte";
  import {OpeningType} from "./types";
  import {content} from "./content";
  import Page from "./Page.svelte";

  let pageNo = 0;
  let opening = OpeningType.MIDDLE;
  let hasBack = false;
  let hasForward = false;

  function handlePageTurned() {
    if (opening === OpeningType.BACK && hasBack) {
      pageNo -= 2;
    } else if (opening === OpeningType.FORWARD && hasForward) {
      pageNo += 2;
    }
    opening = OpeningType.MIDDLE;
  }

  $: {
    hasBack = pageNo > 0;
    hasForward = pageNo < content.length - 2;
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