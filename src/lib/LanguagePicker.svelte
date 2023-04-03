<script lang="ts">
  import {language} from './stores';

  export let variant: 'onpage' | 'bookmark';

  const languages = [
    { name: 'O‘zbek', code: 'uz' },
    { name: 'English', code: 'en' },
    { name: 'Русский', code: 'ru' },
  ];

  function handleLanguageSelect(e, languageCode: string) {
    e.stopPropagation();
    localStorage.setItem('lang', languageCode);
    language.set(languageCode);
  }
</script>

<div class="language-picker">
  {#each languages as languageType}
    <button
        class:selected={$language === languageType.code}
        class:bookmark={variant === 'bookmark'}
        class:onpage={variant === 'onpage'}
        on:click={(e) => handleLanguageSelect(e, languageType.code)}
    >
      {languageType.name}
    </button>
  {/each}
</div>

<style lang="scss">
  .language-picker {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px 16px;
  }
  .onpage {
    --border-size: -4px;
    --border-color: #a98568;
    font-family: var(--default-font-family);
    font-size: var(--default-font-size);
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
</style>
