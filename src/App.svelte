<script lang="ts">
  import Book from "./lib/Book.svelte";
  import {staticLang} from "./lib/static-lang.js";
  import {language} from "./lib/stores.js";

  language.subscribe(value => {
    document.documentElement.lang = value;
  })
</script>

<svelte:head>
  <title>{staticLang.title[$language]}</title>
</svelte:head>
<main>
  <Book />
  {@html import.meta.env.ADDITIONAL_CODE}
</main>