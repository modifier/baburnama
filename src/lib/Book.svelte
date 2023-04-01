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
    'Page 7'
  ];

  let pageNo = 3;
  let opening = Page.MIDDLE;

  function handlePageTurned(e) {
    console.log('Page turned', e.detail.pageNo);
    opening = Page.MIDDLE;
  }
</script>

<div>{pages[pageNo]}</div>
<Codex on:pageTurned={handlePageTurned} bind:pageNo={opening} />