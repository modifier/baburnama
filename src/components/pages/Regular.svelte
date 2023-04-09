<script lang="ts">
  import type {RegularPageContent} from "../../content/content";
  import {language} from "../../stores";
  import {marked} from "marked";
  import {Page} from "../../lib/page";

  export let pageContent: RegularPageContent;
  export let page: Page;
</script>

<div class="article-content">
  {#if 'img' in pageContent}
    <div class="midjourney" class:midjourney--fullscreen={!pageContent.text}
         class:midjourney--narrow={pageContent.imgSize === 'narrow'}
         class:midjourney--supernarrow={pageContent.imgSize === 'supernarrow'}>
      <img src={`/book/boburnama-${pageContent.img}.jpg`} class="midjourney-img"
           class:midjourney-img--contain={pageContent.imgType === 'contain'}
      />
    </div>
  {/if}
  {#if pageContent.text}
    <div class="text">
      {@html marked.parse(pageContent.text[$language])}
    </div>
  {/if}
</div>

{#if !pageContent.hidePageNumber}
  <div class="page-container">
    {page.page + 1}
  </div>
{/if}

<style lang="scss">
  .article-content {
    height: 100%;
    font-size: 0;
    border: var(--border-width) #a98568 double;
  }

  .midjourney {
    width: 100%;
    background: #a98568;
    aspect-ratio: 1.3 / 1;

    &--fullscreen {
      aspect-ratio: auto;
      height: 100%;
    }

    &--narrow {
      aspect-ratio: 1.5 / 1;
    }

    &--supernarrow {
      aspect-ratio: 1.8 / 1;
    }

    &-img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      margin: 0 auto;

      &--contain {
        object-fit: contain;
      }
    }
  }

  .text {
    padding: var(--small-padding);

    .midjourney + & {
      border-top: var(--border-width) #a98568 double;
    }
  }

  .page-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--padding);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--default-font-size);
  }

  :global {
    .text p {
      margin: 0;
      font-size: var(--default-font-size);
      line-height: 1.5em;
    }
    .text p + p {
      margin-top: 1em;
    }
  }
</style>