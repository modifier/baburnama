<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {Page} from "./types";
  const dispatch = createEventDispatcher();

  // source of the concept: https://codepen.io/diemoritat/pen/LKROYZ
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
    <div class="codex__page codex__page--first">
      <slot name="back-1"></slot>
    </div>

    <div class="codex__page codex__page--last">
      <slot name="forward-2"></slot>
    </div>

    <div class="codex__page codex__page--middle-2" on:transitionend={handleAnimationEnd}>
      <div class="codex__page-front">
        <slot name="back-2"></slot>
      </div>
      <div class="codex__page-back" on:click={toBack}>
        <slot name="middle-1"></slot>
      </div>
    </div>

    <div class="codex__page codex__page--middle-3" on:transitionend={handleAnimationEnd}>
      <div class="codex__page-front" on:click={toForward}>
        <slot name="middle-2"></slot>
      </div>
      <div class="codex__page-back">
        <slot name="forward-1"></slot>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .cover {
    --baseline: 12px;
    --page-bg: #f5f5f5;
    width: calc(var(--baseline) * 60);
    height: calc(var(--baseline) * 42.6);
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
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
      background-color: var(--page-bg);
      background-image: linear-gradient(
        90deg,
        rgba(227, 227, 227, 1) 0%,
        rgba(247, 247, 247, 0) 18%
      );

      &:nth-of-type(1) {
        background-image: linear-gradient(
          -90deg,
          rgba(227, 227, 227, 1) 0%,
          rgba(247, 247, 247, 0) 18%
        );
      }

      &--middle-2,
      &--middle-3 {
        cursor: pointer;
        position: absolute;
        right: 0;
        transform-style: preserve-3d;
        background-color: var(--page-bg);
        background-image: linear-gradient(
          90deg,
          rgba(227, 227, 227, 1) 0%,
          rgba(247, 247, 247, 0) 18%
        );
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
