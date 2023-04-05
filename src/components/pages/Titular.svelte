<script lang="ts">
  import type {TitularPageContent} from "../../content/content";
  import {language} from "../../stores.js";
  import LanguagePicker from "../LanguagePicker.svelte";

  export let page: TitularPageContent;
</script>

<div class="titular">
  <h1>{page.text[$language]}</h1>
  {#if page.showOnPageLanguagePicker}
    <LanguagePicker variant="onpage" />
  {/if}
  {#if page.hint}
    <div class="hint">
      {page.hint[$language]}
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