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
  ];

  let pageNo = 3;
  let opening = Page.MIDDLE;

  function handlePageTurned() {
    if (opening === Page.BACK) {
      pageNo -= 2;
    } else if (opening === Page.FORWARD) {
      pageNo += 2;
    }
    opening = Page.MIDDLE;
  }
</script>

<Codex on:pageTurned={handlePageTurned} bind:pageNo={opening}>
  <div slot="back-1">{pages[pageNo - 2]}</div>
  <div slot="back-2">{pages[pageNo - 1]}</div>
  <div slot="middle-1">{pages[pageNo]}</div>
  <div slot="middle-2">{pages[pageNo + 1]}</div>
  <div slot="forward-1">{pages[pageNo + 2]}</div>
  <div slot="forward-2">{pages[pageNo + 3]}</div>
</Codex>