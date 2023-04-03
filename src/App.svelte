<script lang="ts">
  import Book from "./lib/Book.svelte";
  import {onMount} from "svelte";
  import {getPageNoFromUrl} from "./lib/pageNoDetect";
  import {staticLang} from "./lib/static-lang.js";
  import {language, page} from "./lib/stores.js";

  onMount(() => {
    let fragmentPageNo = getPageNoFromUrl();
    if (fragmentPageNo) {
      page.set(fragmentPageNo);
    } else {
      const storagePage = localStorage.getItem("pageNo");
      if (storagePage) {
        page.set(parseInt(storagePage));
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
  <Book />
</main>