<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let selectedLanguage: string;
  export let variant: 'onpage' | 'bookmark';
  const dispatch = createEventDispatcher();

  const languages = [
    { name: 'Uzbek', code: 'uz' },
    { name: 'English', code: 'en' },
    { name: 'Russian', code: 'ru' },
  ];

  function handleLanguageSelect(languageCode: string) {
    selectedLanguage = languageCode;
    dispatch('languageSelected', languageCode);
  }
</script>

<div>
  {#each languages as language}
    <button
        class:selected={selectedLanguage === language.code}
        class:bookmark={variant === 'bookmark'}
        class:onpage={variant === 'onpage'}
        on:click={() => handleLanguageSelect(language.code)}
    >
      {language.name}
    </button>
  {/each}
</div>

<style lang="scss">
  .onpage {
    --border-size: -4px;
    --border-color: #a98568;
    font-family: "Noto Serif", "Times New Roman", serif;
    font-size: 16px;
    margin: 0 10px;
    cursor: pointer;
    padding: 6px 24px;
    color: #111;
    border: 0;

    background: transparent;
    position: relative;
    transition: all 0.2s ease-in-out;

    &::before,
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 0;
      transition: all 0.2s ease-in-out;
    }

    &::before {
      left: var(--border-size);
      right: var(--border-size);
      border-top: 4px double var(--border-color);
      border-bottom: 4px double var(--border-color);
    }

    &::after {
      top: var(--border-size);
      bottom: var(--border-size);
      border-left: 4px double var(--border-color);
      border-right: 4px double var(--border-color);
    }

    &:hover {
      --border-size: -8px;
    }

    &.selected {
      color: #99423b;
      font-weight: 700;
    }
  }

  .bookmark {
    font-family: "Noto Serif", "Times New Roman", serif;
    font-size: 16px;
    margin: 0 6px;
    cursor: pointer;
    padding: 4px 16px;
    color: #111;
    border: 0;
    border-radius: 8px 8px 0 0;
    background-color: #ecdcb9;
    box-shadow: inset 0px -1px 3px 1px rgb(0 0 0 / 70%);

    &.selected {
      color: #99423b;
      font-weight: 700;
    }
  }
</style>
