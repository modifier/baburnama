<script lang="ts">
  import {content} from "./content.js";
  import {marked} from "marked";

  export let page = 0;

  function onLinkClick(e) {
    e.stopPropagation();
  }
</script>

{#if content[page] && content[page].type === 'image'}
  <article>
    <div class="article-content">
      <img src="/book/bobur.jpg" class="bobur" alt="Изображение Захириддина Бабура, сделанное Midjourney" />
    </div>
  </article>
{/if}
{#if content[page] && content[page].type === 'titular'}
  <div class="titular">
    <div>
      <h1>Книга Бабура</h1>
    </div>
  </div>
{/if}
{#if content[page] && content[page].type === 'credits'}
  <div class="credits">
    <div class="credits-wrapper">
      <div class="authors">
        <div>
          <b>Автор</b>: Захириддин Бабур
        </div>
        <div>
          <b>Иллюстрации</b>: <a on:click={onLinkClick} target="_blank" href="https://www.midjourney.com/">Midjourney</a>
        </div>
      </div>
      <div class="developer">
        <div>
          <b>Автор сайта</b>: <a on:click={onLinkClick} target="_blank" href="https://t.me/modifiertravels">Евгений Амирасланов</a>
        </div>
        <div>
          Текст книги и иллюстрации взяты из телеграм-канала <a on:click={onLinkClick} target="_blank" href="https://t.me/boburnama">Boburnama</a>
        </div>
      </div>
      <div class="additional">
        <div>
          Фон &mdash; <a on:click={onLinkClick} target="_blank" href="https://www.pexels.com/photo/desert-during-nighttime-847402/"><b>Desert during Nighttime</b></a>, автор <b>Walid Ahmad</b>
        </div>
        <div>
          Шрифт &mdash; <a on:click={onLinkClick} target="_blank" href="https://www.andrewmarcus.ru/projects/fonts/pehlevi/"><b>Pehlevi</b></a>, автор <b>Андрей Маркелов</b>
        </div>
      </div>
      <div class="year">
        <div>Сделано в Ташкенте</div>
        <div>2023</div>
      </div>
    </div>
  </div>
{/if}
{#if content[page] && (!content[page].type || content[page].type === 'regular')}
  <article>
    <div class="article-content">
      <div class="midjourney">
        <img src={`/book/boburnama-${content[page].img}.jpg`} class="midjourney-img"
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

  a {
    color: #2e7197;
  }

  .bobur {
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