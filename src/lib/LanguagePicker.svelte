<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let selectedLanguage: string;
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
        on:click={() => handleLanguageSelect(language.code)}
    >
      {language.name}
    </button>
  {/each}
</div>

<style>

</style>
