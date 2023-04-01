<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {Page} from "./types";
  const dispatch = createEventDispatcher();

  export let pageNo = Page.MIDDLE;
  export let hasBack = true;
  export let hasForward = true;

  function toBack() {
    if (hasBack) {
      pageNo = Page.BACK;
    }
  }

  function toForward() {
    if (hasForward) {
      pageNo = Page.FORWARD;
    }
  }

  function handleAnimationEnd() {
    dispatch('pageTurned');
  }
</script>

<div class="cover">
  <div
    class="codex"
    class:codex--back={pageNo === Page.BACK}
    class:codex--forward={pageNo === Page.FORWARD}
  >
    <div class="codex__page codex__page--first codex__page-left">
      <slot name="back-1"></slot>
    </div>

    <div class="codex__page codex__page--last codex__page-right">
      <slot name="forward-2"></slot>
    </div>

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
  </div>
</div>

<style lang="scss">
  .cover {
    max-height: 85%;
    max-width: 85%;
    position: absolute;
    inset: 0;
    margin: auto;
    aspect-ratio: 1.4 / 1;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
  }

  :global {
    .codex__page-right div,
    .codex__page-left div {
      position: relative;
    }
  }

  .codex {
    width: 100%;
    height: 100%;
    display: flex;
    perspective: 1200px;
    position: relative;

    &__page {
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      display: grid;
      transform: rotateY(0deg);
      transform-origin: 0 0;
      position: relative;

      &-right::before,
      &-left::before {
        content: "";
        filter: brightness(0.95) sepia(30%) saturate(80%);
        position: absolute;
        inset: 0;
        z-index: 0;
        background-size: 1000px;
        background-image: url('../assets/paper.png');
      }

      &-right::after,
      &-left::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
      }

      &-right > *,
      &-left > * {
        position: relative;
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
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotateY(0deg) translateZ(1px);
      }

      &-back {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
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
