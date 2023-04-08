<script lang="ts">
  import {afterUpdate, createEventDispatcher} from 'svelte';
  import {Opening} from "../types";
  import {isMobile, language} from "../stores.js";
  import {staticLang} from "../content/static-lang.js";
  import {fallbackTransition} from '../lib/transition';

  const dispatch = createEventDispatcher();

  export let opening = Opening.MIDDLE;
  export let hasBack = true;
  export let hasForward = true;
  export let isTurning = false;

  function handleKeyDown(callback) {
    return (e) => {
      if (e.target.tagName === "A") {
        return;
      }

      if (e.key === 'Enter') {
        callback();
      }
    }
  }

  function toBack() {
    if (hasBack && !isTurning && opening === Opening.MIDDLE) {
      dispatch('pageTurning', { direction: 'back' });
    }
  }

  function toForward() {
    if (hasForward && !isTurning && opening === Opening.MIDDLE) {
      dispatch('pageTurning', { direction: 'forward' });
    }
  }

  function handleForwardClick(e) {
    if ($isMobile) {
      handleMobileTap(e);
    } else {
      toForward();
    }
  }

  function handleMobileTap(e) {
    const x = e.pageX;
    if (x > window.innerWidth / 2) {
      dispatch('pageTurning', { direction: 'forward' });
    } else {
      dispatch('pageTurning', { direction: 'back' });
    }
  }

  function handleAnimationEnd() {
    dispatch('pageTurned');
    isTurning = false;
    opening = Opening.MIDDLE;
  }

  afterUpdate(() => {
    if (opening !== Opening.MIDDLE) {
      setTimeout(() => {
        isTurning = true;
      }, 10);
    }
  });
</script>

<div class="cover">
  <div
    class="codex"
    class:codex--back={opening === Opening.BACK && isTurning}
    class:codex--forward={opening === Opening.FORWARD && isTurning}
  >
    {#if isMobile}
      <div class="codex__mobile-nav codex__mobile-nav--back" on:keydown={handleKeyDown(toBack)}
           tabindex={hasBack ? 0 : -1}
           aria-label={hasBack ? staticLang.previousPage[$language] : ""}
           role={hasBack ? "button" : "none"}></div>
      <div class="codex__mobile-nav codex__mobile-nav--forward" on:keydown={handleKeyDown(toForward)}
           tabindex={hasForward ? 0 : -1}
           aria-label={hasForward ? staticLang.nextPage[$language] : ""}
           role={hasForward ? "button" : "none"}></div>
    {/if}

    {#if !$isMobile}
      <div class="codex__page codex__page--first codex__page-left"
           on:click={toBack}
           on:keydown={handleKeyDown(toBack)}
           tabindex={hasBack ? 0 : -1}
           aria-label={hasBack ? staticLang.previousPage[$language] : ""}
           role={hasBack ? "button" : "none"}>
        <div class="codex__page-content">
          {#if opening === Opening.BACK}
            <slot name="back-1"></slot>
          {:else}
            <slot name="middle-1"></slot>
          {/if}
        </div>
      </div>
    {/if}

    <div class="codex__page codex__page--last codex__page-right"
         on:click={handleForwardClick}
         on:keydown={handleKeyDown(toForward)}
         tabindex={!$isMobile && hasForward ? 0 : -1}
         aria-label={!$isMobile && hasForward ? staticLang.nextPage[$language] : ""}
         role={!$isMobile && hasForward ? "button" : "none"}>
      <div class="codex__page-content">
        {#if opening === Opening.FORWARD}
          {#if $isMobile}
            <slot name="forward-1"></slot>
          {:else}
            <slot name="forward-2"></slot>
          {/if}
        {:else}
          {#if $isMobile}
            <slot name="middle-1"></slot>
          {:else}
            <slot name="middle-2"></slot>
          {/if}
        {/if}
      </div>
    </div>

    {#if opening === Opening.BACK}
      <div class="codex__page codex__page--middle-2"
           use:fallbackTransition={{ durationSecs: 1, isActive: isTurning }}
           on:pageturned={handleAnimationEnd}>
        <div class="codex__page-front codex__page-right">
          {#if $isMobile}
            <slot name="back-1"></slot>
          {:else}
            <slot name="back-2"></slot>
          {/if}
        </div>
        <div class="codex__page-back codex__page-left" on:click={toBack}>
          {#if !$isMobile}
            <slot name="middle-1"></slot>
          {/if}
        </div>
      </div>
    {/if}

    {#if opening === Opening.FORWARD}
      <div class="codex__page codex__page--middle-3"
           use:fallbackTransition={{ durationSecs: 1, isActive: isTurning }}
           on:pageturned={handleAnimationEnd}>
        <div class="codex__page-front codex__page-right" on:click={toForward}>
          {#if $isMobile}
            <slot name="middle-1"></slot>
          {:else}
            <slot name="middle-2"></slot>
          {/if}
        </div>
        <div class="codex__page-back codex__page-left">
          {#if !$isMobile}
            <slot name="forward-1"></slot>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .cover {
    max-height: 100%;
    max-width: 100%;
    background-color: hsl(13deg 37% 36% / 99%);
    aspect-ratio: 1.6 / 1;
    box-shadow: 0 0 100px rgb(0 0 0 / 50%), 0 0 11px 5px rgb(0 0 0 / 50%) inset;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    @media screen and (max-width: 800px) {
      aspect-ratio: auto;
      width: 100%;
      height: 100%;
      justify-content: flex-start;
    }
  }

  .codex {
    width: calc(100% - 48px);
    height: calc(100% - 8px);
    display: flex;
    perspective: 1200px;
    position: relative;

    @media screen and (max-width: 800px) {
      width: calc(100% - 24px);
    }

    &__mobile-nav {
      display: none;

      @media screen and (max-width: 800px) {
        display: block;
        position: absolute;
        inset: 0;
        pointer-events: none;
        width: 50%;
      }

      &--back {
        left: 0;
        right: auto;
      }

      &--forward {
        right: 0;
        left: auto;
      }
    }

    &::after,
    &::before {
      --dark: rgb(136 131 122);
      --light: rgba(237,229,215,1);
      --gradient: var(--dark) 0%, var(--light) 10%, var(--dark) 11%, var(--light) 18%, var(--light) 23%, var(--dark) 24%, var(--light) 31%, var(--light) 36%, var(--dark) 38%, var(--light) 45%, var(--light) 49%, var(--dark) 51%, var(--light) 60%, var(--dark) 62%, var(--light) 71%, var(--light) 91%, var(--dark) 93%, var(--light) 100%;
      content: "";
      position: absolute;
      width: 16px;
      top: 0;
      bottom: 0;
      pointer-events: none;
    }

    &::after {
      right: -16px;
      background: linear-gradient(-90deg, var(--gradient));
    }

    &::before {
      left: -16px;
      background: linear-gradient(90deg, var(--gradient));

      @media screen and (max-width: 800px) {
        display: none;
      }
    }

    &__page {
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      display: grid;
      transform: rotateY(0deg);
      transform-origin: 0 0;
      position: relative;
      cursor: pointer;

      @media screen and (max-width: 800px) {
        width: 100%;
      }

      &-content,
      &-front,
      &-back {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        @media screen and (max-width: 800px) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      &-right {
        border-top-left-radius: 47px 12px;
        overflow: hidden;
      }

      &-left {
        border-top-right-radius: 47px 12px;
        overflow: hidden;
      }

      &-right::before,
      &-left::before {
        content: "";
        filter: brightness(0.95) sepia(30%) saturate(80%);
        position: absolute;
        inset: 0;
        z-index: 0;
        background-size: 1000px;
        background-image: url('../assets/paper.jpg');
        background-color: #f8f0e2;
        pointer-events: none;
      }

      &-right::after,
      &-left::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }

      &-right::after {
        background-image: linear-gradient(90deg, rgb(55 55 55 / 20%) 0%, rgba(247, 247, 247, 0) 8%);
      }

      &-left::after {
        background-image: linear-gradient(-90deg, rgba(149, 145, 145, 0.2) 0%, rgba(247, 247, 247, 0) 5%);
      }

      &-right::before {
        background-position: right bottom;
      }

      &--middle-2,
      &--middle-3 {
        cursor: pointer;
        position: absolute;
        right: 0;
        transform-style: preserve-3d;
      }

      &--middle-2 {
        z-index: 2;
        transform: rotateY(-180deg);
      }

      &-front {
        transform: rotateY(0deg) translateZ(1px);
      }

      &-back {
        transform: rotateY(180deg) translateZ(1px);
      }
    }

    &--back {
      .codex__page--middle-2 {
        transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform: rotateY(0);
      }
    }

    &--forward {
      .codex__page--middle-3 {
        transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
        z-index: 2;
        transform: rotateY(-180deg);
      }
    }
  }
</style>
