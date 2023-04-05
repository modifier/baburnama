<script lang="ts">
  import type {RegularPageContent} from "../../content/content";
  import {language} from "../../stores.js";
  import {marked} from "marked";

  export let page: RegularPageContent;
  export let pageNo: number;
</script>

<div class="article-content">
  {#if 'img' in page}
    <div class="midjourney" class:midjourney--fullscreen={!page.text}
         class:midjourney--narrow={page.imgSize === 'narrow'}
         class:midjourney--supernarrow={page.imgSize === 'supernarrow'}>
      <img src={`/book/boburnama-${page.img}.jpg`} class="midjourney-img"
           class:midjourney-img--contain={page.imgType === 'contain'}
      />
    </div>
  {/if}
  {#if page.text}
    <div class="text">
      {@html marked.parse(page.text[$language])}
    </div>
  {/if}
</div>

{#if !page.hidePageNumber}
  <div class="page-container">
    {pageNo + 1}
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