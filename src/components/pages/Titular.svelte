<script lang="ts">
  import type {TitularPageContent} from "../../content/content";
  import {language} from "../../stores.js";
  import LanguagePicker from "../LanguagePicker.svelte";

  export let pageContent: TitularPageContent;
</script>

<div class="titular">
  <h1>{pageContent.text[$language]}</h1>
  {#if pageContent.subtitle}
    <h2>{pageContent.subtitle[$language]}</h2>
  {/if}
  {#if pageContent.showOnPageLanguagePicker}
    <div class="titular__language-picker">
      <LanguagePicker variant="onpage" />
    </div>
  {/if}
  {#if pageContent.hint}
    <div class="hint">
      {pageContent.hint[$language]}
    </div>
  {/if}
</div>

<style lang="scss">
  .titular {
    align-self: center;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: var(--heading-font-size);
    font-family: var(--heading-font-family);
  }

  h2 {
    margin-top: 0.5em;
    font-weight: 500;
    font-style: italic;
    font-family: var(--default-font-family);
  }

  .titular__language-picker {
    margin-top: 2em;
  }

  .hint {
    margin-top: 2em;
    font-style: italic;
    color: #851f1f;
  }
</style>