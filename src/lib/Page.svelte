<script lang="ts">
  import {content} from "./content.js";
  import {marked} from "marked";

  export let page = 0;
</script>

{#if content[page]}
  <article>
    <div class="article-content">
      <div class="midjourney">
        <img src={`/book/boburnama-${page + 1}.jpg`} class="midjourney-img"
             class:midjourney-img--narrow={content[page].narrow}/>
      </div>
      <div class="text">
        {@html marked.parse(content[page].text)}
      </div>
    </div>
    <div class="page-container">
      {page + 1}
    </div>
  </article>
{/if}

<style lang="scss">
  article {
    height: 100%;
    padding: 48px;
    box-sizing: border-box;
    font-size: 0;
    position: relative;
  }

  .article-content {
    height: 100%;
    border: 4px #a98568 double;
  }

  .midjourney {
    width: 100%;
    background: #a98568;
  }

  .midjourney-img {
    object-fit: cover;
    max-width: 100%;
    margin: 0 auto;
    aspect-ratio: 1.25 / 1;
  }

  .midjourney-img--narrow {
    object-fit: contain;
    aspect-ratio: 1.6/1;
  }

  .text {
    line-height: 24px;
    border-top: 4px #a98568 double;
    padding: 8px;
  }

  .page-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 32px;
    text-align: center;
    font-size: 16px;
  }

  :global {
    .text p {
      margin: 0;
      font-size: 16px;
    }
    .text p + p {
      margin-top: 1em;
    }
  }
</style>