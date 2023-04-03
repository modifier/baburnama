<script lang="ts">
  import {createEventDispatcher} from 'svelte';
  import {OpeningType} from "./types";
  const dispatch = createEventDispatcher();

  export let opening = OpeningType.MIDDLE;
  export let hasBack = true;
  export let hasForward = true;
  export let isTurning = false;

  function toBack() {
    if (hasBack && !isTurning) {
      dispatch('pageTurning', { direction: 'back' });
    }
  }

  function toForward() {
    if (hasForward && !isTurning) {
      dispatch('pageTurning', { direction: 'forward' });
    }
  }

  function handleAnimationEnd() {
    dispatch('pageTurned');
  }
</script>

<div class="cover">
  <div
    class="codex"
    class:codex--back={opening === OpeningType.BACK}
    class:codex--forward={opening === OpeningType.FORWARD}
  >
    <div class="codex__page codex__page--first codex__page-left" on:click={toBack}>
      <div class="codex__page-content">
        {#if isTurning}
          <slot name="back-1"></slot>
        {:else}
          <slot name="middle-1"></slot>
        {/if}
      </div>
    </div>

    <div class="codex__page codex__page--last codex__page-right" on:click={toForward}>
      <div class="codex__page-content">
        {#if isTurning}
          <slot name="forward-2"></slot>
        {:else}
          <slot name="middle-2"></slot>
        {/if}
      </div>
    </div>

    {#if isTurning}
      <div class="codex__page codex__page--middle-2" on:transitionend={handleAnimationEnd}>
        <div class="codex__page-front codex__page-right">
          <slot name="back-2"></slot>
        </div>
        <div class="codex__page-back codex__page-left" on:click={toBack}>
          <slot name="middle-1"></slot>
        </div>
      </div>

      <div class="codex__page codex__page--middle-3" on:transitionend={handleAnimationEnd}>
        <div class="codex__page-front codex__page-right" on:click={toForward}>
          <slot name="middle-2"></slot>
        </div>
        <div class="codex__page-back codex__page-left">
          <slot name="forward-1"></slot>
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
  }

  :global {
    .codex__page-right > div,
    .codex__page-left > div {
      position: relative;
      height: 100%;
    }
  }

  .codex {
    width: calc(100% - 48px);
    height: calc(100% - 8px);
    display: flex;
    perspective: 1200px;
    position: relative;

    &::after {
      --dark: rgb(136 131 122);
      --light: rgba(237,229,215,1);
      content: "";
      position: absolute;
      width: 16px;
      right: -16px;
      background: linear-gradient(-90deg, var(--dark) 0%, var(--light) 10%, var(--dark) 11%, var(--light) 18%, var(--light) 23%, var(--dark) 24%, var(--light) 31%, var(--light) 36%, var(--dark) 38%, var(--light) 45%, var(--light) 49%, var(--dark) 51%, var(--light) 60%, var(--dark) 62%, var(--light) 71%, var(--light) 91%, var(--dark) 93%, var(--light) 100%);
      top: 0;
      bottom: 0;
      pointer-events: none;
    }

    &::before {
      --dark: rgb(136 131 122);
      --light: rgba(237,229,215,1);
      content: "";
      position: absolute;
      width: 16px;
      left: -16px;
      background: linear-gradient(90deg, var(--dark) 0%, var(--light) 10%, var(--dark) 11%, var(--light) 18%, var(--light) 23%, var(--dark) 24%, var(--light) 31%, var(--light) 36%, var(--dark) 38%, var(--light) 45%, var(--light) 49%, var(--dark) 51%, var(--light) 60%, var(--dark) 62%, var(--light) 71%, var(--light) 91%, var(--dark) 93%, var(--light) 100%);
      top: 0;
      bottom: 0;
      pointer-events: none;
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

      &-content,
      &-front,
      &-back {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
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
        background-image: url('../assets/paper.png');
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
