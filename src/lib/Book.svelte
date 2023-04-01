<script lang="ts">
  import Codex from "./Codex.svelte";
  import {Page} from "./types";

  const pages = [
    'Page 1',
    'Page 2',
    'Page 3',
    'Page 4',
    'Page 5',
    'Page 6',
    'Page 7',
    'Page 8',
    'Page 9',
    'Page 10',
    'Page 11',
    'Page 12',
  ];

  let pageNo = 2;
  let opening = Page.MIDDLE;
  let hasBack = false;
  let hasForward = false;

  function handlePageTurned() {
    if (opening === Page.BACK) {
      pageNo -= 2;
    } else if (opening === Page.FORWARD) {
      pageNo += 2;
    }
    opening = Page.MIDDLE;
  }

  $: if (pageNo > 0) {
    hasBack = true;
  } else {
    hasBack = false;
  }

  if (pageNo < pages.length - 1) {
    hasForward = true;
  } else {
    hasForward = false;
  }
</script>

<Codex on:pageTurned={handlePageTurned} bind:pageNo={opening} hasBack={hasBack} hasForward={hasForward}>
  <div slot="back-1">{hasBack && pages[pageNo - 2]}</div>
  <div slot="back-2">{hasBack && pages[pageNo - 1]}</div>
  <div slot="middle-1">{pages[pageNo]}</div>
  <div slot="middle-2">{pages[pageNo + 1]}</div>
  <div slot="forward-1">{hasForward && pages[pageNo + 2]}</div>
  <div slot="forward-2">{hasForward && pages[pageNo + 3]}</div>
</Codex>