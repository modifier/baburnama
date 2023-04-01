<script lang="ts">
  import Book from "./lib/Book.svelte";
  import {onMount} from "svelte";
  import {getPageNo} from "./lib/pageNoDetect";

  let pageNo = 0;

  onMount(() => {
    pageNo = getPageNo();
  });
</script>

<main>
  <Book pageNo={pageNo} />
</main>