<script lang="ts">
    import {staticLang} from "../../content/static-lang.js";
    import {content} from "../../content/content.js";
    import {isMobile, language} from "../../stores.js";
    import LanguagePicker from "../LanguagePicker.svelte";

</script>

<div class="table-of-contents-wrapper">
  <h1 class="table-of-contents-title">
    {staticLang.tableOfContents[$language]}
  </h1>
  <ul class="table-of-contents-content">
    {#each content as page, i}
      {#if page.title}
        <li class="table-of-contents-item">
          <a href="#page-{i + 1}" tabindex="0">
              <span class="table-of-contents-item__title">
                {page.title[$language]}
              </span>
            <span class="table-of-contents-item__gap"></span>
            <span class="table-of-contents-item__page-number">
                {i + 1}
              </span>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</div>
{#if $isMobile}
  <LanguagePicker variant="onpage" />
{/if}

<style lang="scss">
  .table-of-contents-wrapper {
    flex: 1 0 auto;
    width: 100%;
  }

  .table-of-contents-title {
    margin: 0;
    text-align: center;
    font-family: var(--heading-font-family);
  }

  .table-of-contents-content {
    list-style: none;
    padding: 0;
    margin: var(--padding) 0 0;
  }

  .table-of-contents-item {
    margin: var(--small-padding) 0;

    a {
      color: black;
      text-decoration: none;
      display: flex;
      width: 100%;
      justify-content: space-between;
      gap: var(--small-padding);
    }

    &__title {
      color: #2e7197;
      text-decoration: underline;
    }

    &__gap {
      flex: 1 0 auto;
      border-bottom: calc(var(--default-font-size) / 8) #666 dotted;
      margin-bottom: calc(var(--default-font-size) / 8);
    }
  }
</style>