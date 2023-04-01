<script lang="ts">
  import Book from "./lib/Book.svelte";
  import {onMount} from "svelte";
  import {getPageNo} from "./lib/pageNoDetect";

  let pageNo = 0;

  onMount(() => {
    let fragmentPageNo = getPageNo();
    if (fragmentPageNo) {
      pageNo = fragmentPageNo;
    } else {
      const storagePage = localStorage.getItem("pageNo");
      if (storagePage) {
        pageNo = parseInt(storagePage);
      }
    }
  });
</script>

<main>
  <Book pageNo={pageNo} />
</main>