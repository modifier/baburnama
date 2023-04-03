<script lang="ts">
  import {content} from "./content.js";
  import {marked} from "marked";
  import LanguagePicker from "./LanguagePicker.svelte";
  import {language, page as pageStore} from "./stores";
  import {staticLang} from "./static-lang.js";

  export let page = 0;

  function onLinkClick(e) {
    e.stopPropagation();
  }

  marked.use({
    renderer: {
      link(href, title, text) {
        return `<a target="_blank" href="${href}">${text}</a>`;
      }
    }
  })

  function captureLinkClick(e) {
    if (e.target.tagName === 'A') {
      e.stopPropagation();

      if (e.target.href.includes('#page-')) {
        e.preventDefault();
        const page = parseInt(e.target.href.match(/#page-(\d+)/)[1]);
        pageStore.set(page);
        history.pushState(null, null, `#page-${page}`);
      }
    }
  }
</script>

{#if content[page] && content[page].type === 'titular-image'}
  <article>
    <div class="article-content">
      <img src="/book/bobur.jpg" class="fullpage-picture" alt="Изображение Захириддина Бабура, сделанное Midjourney" />
    </div>
  </article>
{/if}
{#if content[page] && content[page].type === 'titular'}
  <div class="titular">
    <div>
      <h1>{staticLang.title[$language]}</h1>
      <LanguagePicker variant="onpage" />
    </div>
  </div>
{/if}
{#if content[page] && content[page].type === 'credits'}
  <div class="credits" on:click={captureLinkClick}>
    <div class="credits-wrapper">
      <div class="authors">
        <div>
          {@html marked.parse(staticLang.author[$language])}
        </div>
        <div>
          {@html marked.parse(staticLang.illustrations[$language])}
        </div>
      </div>
      <div class="developer">
        <div>
          {@html marked.parse(staticLang.siteAuthor[$language])}
        </div>
        <div>
          {@html marked.parse(staticLang.source[$language])}
        </div>
        <div>
          {@html marked.parse(staticLang.sourceCode[$language])}
        </div>
      </div>
      <div class="additional">
        <div>
          {@html marked.parse(staticLang.background[$language])}
        </div>
        <div>
          {@html marked.parse(staticLang.font[$language])}
        </div>
      </div>
      <div class="year">
        <div>{staticLang.madeInToshkent[$language]}</div>
        <div>2023</div>
      </div>
    </div>
  </div>
{/if}
{#if content[page] && content[page].type === 'image'}
  <article>
    <div class="article-content">
      <img src="/book/boburnama-{content[page].img}.jpg" class="fullpage-picture" />
    </div>
    <div class="page-container">
      {page + 1}
    </div>
  </article>
{/if}
{#if content[page] && (!content[page].type || content[page].type === 'regular')}
  <article on:click={captureLinkClick}>
    <div class="article-content">
      {#if content[page].img}
        <div class="midjourney">
          <img src={`/book/boburnama-${content[page].img}.jpg`} class="midjourney-img"
               class:midjourney-img--narrow={content[page].imgSize === 'narrow'}
               class:midjourney-img--supernarrow={content[page].imgSize === 'supernarrow'}
          />
        </div>
      {/if}
      <div class="text">
        {@html marked.parse(content[page].text[$language])}
      </div>
    </div>
    <div class="page-container">
      {page + 1}
    </div>
  </article>
{/if}
{#if content[page] && content[page].type === 'duoimg'}
  <article>
    <div class="duoimg-content">
      <img src={`/book/boburnama-${content[page].img1}.jpg`} class="midjourney-pic"
           class:midjourney-img--narrow={content[page].imgSize === 'narrow'}
           class:midjourney-img--supernarrow={content[page].imgSize === 'supernarrow'}
      />
      <img src={`/book/boburnama-${content[page].img2}.jpg`} class="midjourney-pic"
           class:midjourney-img--narrow={content[page].imgSize === 'narrow'}
           class:midjourney-img--supernarrow={content[page].imgSize === 'supernarrow'}
      />
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

  .duoimg-content {
    border: 4px #a98568 double;
    display: flex;
    flex-direction: column;
    height: 100%;

    .midjourney-pic {
      height: 50%;
      object-fit: contain;
    }

    .midjourney-pic + .midjourney-pic {
      border-top: 4px #a98568 double;
    }
  }

  .article-content {
    height: 100%;
    border: 4px #a98568 double;
  }

  :global {
    article a, .credits a {
      color: #2e7197;
    }
  }

  .fullpage-picture {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .titular {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 48px;
    box-sizing: border-box;

    h1 {
      margin-top: 0;
      font-size: 72px;
      font-family: "Pehlevi", serif;
    }
  }

  .credits {
    padding: 48px;
    box-sizing: border-box;
    line-height: 2em;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    :global {
      p {
        margin: 0;
      }
    }

    .authors, .developer, .additional {
      margin-bottom: 3em;
    }

    .year {
      text-align: center;
    }
  }

  .midjourney {
    width: 100%;
    background: #a98568;
  }

  .midjourney-img {
    object-fit: cover;
    max-width: 100%;
    margin: 0 auto;
    aspect-ratio: 1.3 / 1;
  }

  .midjourney-img--narrow {
    object-fit: contain;
    aspect-ratio: 1.5/1;
  }

  .midjourney-img--supernarrow {
    object-fit: contain;
    aspect-ratio: 1.8/1;
  }

  .text {
    line-height: 24px;
    padding: 8px;

    .midjourney + & {
      border-top: 4px #a98568 double;
    }
  }

  .page-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 32px;
    text-align: center;
    font-size: 15px;
  }

  :global {
    .text p {
      margin: 0;
      font-size: 15px;
    }
    .text p + p {
      margin-top: 1em;
    }
  }
</style>