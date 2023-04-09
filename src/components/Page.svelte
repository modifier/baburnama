<script lang="ts">
  import type {PageContent} from "../content/content";
  import {marked} from "marked";
  import Credits from "./pages/Credits.svelte";
  import TableOfContents from "./pages/TableOfContents.svelte";
  import Titular from "./pages/Titular.svelte";
  import Regular from "./pages/Regular.svelte";
  import {page as pageStore} from '../stores';
  import {Page} from "../lib/page";

  export let page: Page = new Page(0, 'page');
  let pageContent: PageContent;

  marked.use({
    renderer: {
      link(href, title, text) {
        return `<a target="_blank" href="${href}" tabindex="0">${text}</a>`;
      }
    }
  })

  function captureLinkClick(e) {
    const closestLink = e.target.closest('A');
    if (closestLink) {
      e.stopPropagation();

      if (closestLink.href.includes('#page-')) {
        e.preventDefault();
        const page = Page.fromUrl(closestLink.href);
        pageStore.set(page);
        page.pushToHistory();
      }
    }
  }

  $: {
    pageContent = page.getPageContent();
  }
</script>

<article on:click={captureLinkClick}>
  {#if pageContent && pageContent.type === 'tableOfContents'}
    <TableOfContents />
  {/if}
  {#if pageContent && pageContent.type === 'titular'}
    <Titular pageContent={pageContent} />
  {/if}
  {#if pageContent && pageContent.type === 'credits'}
    <Credits />
  {/if}
  {#if pageContent && pageContent.type === 'regular'}
    <Regular pageContent={pageContent} page={page} />
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