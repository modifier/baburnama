<script>
  // source of the concept: https://codepen.io/diemoritat/pen/LKROYZ
  let pageNo = 1;

  function forward() {
      pageNo++;
      if (pageNo > 2) {
          pageNo = 2;
      }
  }

  function back() {
      pageNo--;
      if (pageNo < 0) {
          pageNo = 0;
      }
  }
</script>

<style lang="scss">
  body {
    background-color: var(--body-bg);
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cover {
    --baseline: 12px;
    --page-bg: #F5F5F5;
    width: calc(var(--baseline) * 60);
    height: calc(var(--baseline) * 42.6);
    box-shadow: 0 0 100px rgba(0, 0, 0, .3);
    box-sizing: border-box;
  }

  .codex {
    width: 100%;
    height: 100%;
    display: flex;
    perspective: 1200px;

    &__page {
      box-sizing: border-box;
      position: relative;
      width: 50%;
      height: 100%;
      display: grid;
      transform: rotateY(0deg);
      transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 0% 0%;
      background-color: var(--page-bg);
      background-image: linear-gradient(90deg, rgba(227,227,227,1) 0%, rgba(247,247,247,0) 18%);

      &:nth-of-type(1) {
        background-image: linear-gradient(-90deg, rgba(227,227,227,1) 0%, rgba(247,247,247,0) 18%);
      }

      &--first {
        cursor: pointer;
      }

      &--last {
        cursor: pointer;
      }

      &--middle-2,
      &--middle-3 {
        position: absolute;
        right: 0;
        pointer-events: none;
        transform-style: preserve-3d;
        background-color: var(--page-bg);
        background-image: linear-gradient(90deg, rgba(227,227,227,1) 0%, rgba(247,247,247,0) 18%);
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
        transform: rotateY(0);
      }
    }

    &--forward {
      .codex__page--middle-3 {
        z-index: 2;
        transform: rotateY(-180deg);
      }
    }
  }
</style>

<div class="cover">
  <div class="codex" class:codex--back={pageNo === 0} class:codex--forward={pageNo === 2}>
    <div class="codex__page codex__page--first">
      Content 1
    </div>

    <div class="codex__page codex__page--last">
      Content 6
    </div>

    <div class="codex__page codex__page--middle-2">
      <div class="codex__page-front">
        Content 2
      </div>
      <div class="codex__page-back">
        Content 3
      </div>
    </div>

    <div class="codex__page codex__page--middle-3">
      <div class="codex__page-front">
        Content 4
      </div>
      <div class="codex__page-back">
        Content 5
      </div>
    </div>
  </div>
</div>

<button on:click={back}>Back</button>
<button on:click={forward}>Forward</button>