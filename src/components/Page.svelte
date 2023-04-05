<script lang="ts">
  import {content} from "../content/content.js";
  import {marked} from "marked";
  import Credits from "./pages/Credits.svelte";
  import TableOfContents from "./pages/TableOfContents.svelte";
  import Titular from "./pages/Titular.svelte";
  import Regular from "./pages/Regular.svelte";

  export let page = 0;

  marked.use({
    renderer: {
      link(href, title, text) {
        return `<a target="_blank" href="${href}" tabindex="0">${text}</a>`;
      }
    }
  })

  function captureLinkClick(e) {
    if (e.target.tagName === 'A') {
      e.stopPropagation();
    }
  }
</script>

<article on:click={captureLinkClick}>
  {#if content[page] && content[page].type === 'tableOfContents'}
    <TableOfContents />
  {/if}
  {#if content[page] && content[page].type === 'titular'}
    <Titular page={content[page]} />
  {/if}
  {#if content[page] && content[page].type === 'credits'}
    <Credits />
  {/if}
  {#if content[page] && content[page].type === 'regular'}
    <Regular page={content[page]} pageNo={page} />
  {/if}
</article>

<style lang="scss">
  :root {
    --padding: min(6vh, 5vw, 64px);
    --border-width: 4px;
    --small-padding: calc(var(--padding) / 4);

    @media screen and (max-width: 800px) {
      --small-padding: calc(var(--padding) / 2);
    }
  }

  article {
    justify-content: center;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    padding: var(--padding);
    position: relative;
    flex-direction: column;
    align-content: center;

    @media screen and (max-width: 800px) {
      aspect-ratio: 0.55 / 1;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
      inset: 0;
    }
  }
</style>