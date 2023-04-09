<script lang="ts">
  import type {TitularPageContent} from "../../content/content";
  import {language} from "../../stores.js";
  import LanguagePicker from "../LanguagePicker.svelte";

  export let pageContent: TitularPageContent;
</script>

<div class="titular">
  <h1>{pageContent.text[$language]}</h1>
  {#if pageContent.showOnPageLanguagePicker}
    <LanguagePicker variant="onpage" />
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
    margin-top: 0;
    font-size: var(--heading-font-size);
    font-family: var(--heading-font-family);
  }

  .hint {
    margin-top: 2em;
    font-style: italic;
    color: #851f1f;
  }
</style>