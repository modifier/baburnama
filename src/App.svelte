<script lang="ts">
  import Book from "./components/Book.svelte";
  import {staticLang} from "./content/static-lang.js";
  import {language} from "./stores.js";

  language.subscribe(value => {
    document.documentElement.lang = value;
  });
</script>

<svelte:head>
  <title>{staticLang.title[$language]}</title>
</svelte:head>
<main>
  <Book />
</main>