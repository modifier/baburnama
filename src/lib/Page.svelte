<script lang="ts">
  import {content} from "./content.js";

  export let page = 0;
</script>

{#if content[page]}
  <article>
    <div class="midjourney">
      <img src={`/book/boburnama-${page + 1}.jpg`} class="midjourney-img"
           class:midjourney-img--narrow={content[page].narrow}/>
    </div>
    <div class="text">
      {content[page].text}
    </div>
  </article>
{/if}

<style lang="scss">
  article {
    margin: 48px;
    border: 4px #a98568 double;
    height: calc(100% - 96px);
    font-size: 0;
  }

  .midjourney {
    width: 100%;
    background: #a98568;
  }

  .midjourney-img {
    object-fit: cover;
    max-width: 100%;
    margin: 0 auto;
    aspect-ratio: 1.2 / 1;
  }

  .midjourney-img--narrow {
    object-fit: contain;
    aspect-ratio: 1.5/1;
  }

  .text {
    font-size: 16px;
    line-height: 24px;
    border-top: 4px #a98568 double;
    padding: 8px;
  }
</style>