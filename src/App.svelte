<script lang="ts">
  import Book from "./lib/Book.svelte";
  import {onMount} from "svelte";
  import {getPageNo} from "./lib/pageNoDetect";
  import {staticLang} from "./lib/static-lang.js";
  import {language} from "./lib/stores.js";

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

  language.subscribe(value => {
    document.documentElement.lang = value;
  })
</script>

<svelte:head>
  <title>{staticLang.title[$language]}</title>
</svelte:head>
<main>
  <Book pageNo={pageNo} />
</main>