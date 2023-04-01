<script>
  // source of the concept: https://codepen.io/diemoritat/pen/LKROYZ
  let pageNo = 0;

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
  @import url('https://fonts.googleapis.com/css?family=Cormorant+Garamond:300,400,600|Tulpen+One&display=swap');

  :root {
    /* colors */
    --body-bg: #FAFAFA;
    --page-bg: #F5F5F5;
    --dark-text: #2A2935;

    /* spacing */
    /* this is what defines the global scale */
    --baseline: 12px;

    /* fonts */
    --book-title: 'Tulpen One', sans-serif;
    --title: 'Cormorant Garamond', serif;
    --body: 'Cormorant Garamond', serif;
    --base-size: var(--baseline) * 1.2;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: var(--body-bg);
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cover {
    width: calc(var(--baseline) * 60);
    height: calc(var(--baseline) * 42.6);
    box-shadow: 0 0 100px rgba(0, 0, 0, .3);
  }

  .codex {
    width: 100%;
    height: 100%;
    display: flex;
    perspective: 1200px;

    &__page {
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
        overflow: hidden;
      }

      &--last {
        cursor: pointer;
        padding: 0 calc(var(--baseline) * 3);
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

      &-front {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotateY(0deg) translateZ(1px);
      }

      &-back {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 calc(var(--baseline) * 1.8);
        transform: rotateY(180deg) translateZ(1px);
      }
    }

    .codex__page--middle-2 {
      z-index: 2;
    }

    &--second {
      .codex__page--middle-2 {
        transform: rotateY(-180deg);
      }

      .codex__page--middle-2 {
        z-index: 2;
      }
    }

    &--third {
      .codex__page--middle-3 {
        z-index: 2;
        transform: rotateY(-180deg);
      }
    }
  }
</style>

<div class="cover">
  <div class="codex" class:codex--second={pageNo !== 0} class:codex--third={pageNo === 2}>
    <label class="codex__page codex__page--first">
      Content 1
    </label>

    <label class="codex__page codex__page--last">
      Content 6
    </label>

    <label class="codex__page codex__page--middle-2">
      <div class="codex__page-front">
        Content 2
      </div>
      <div class="codex__page-back">
        Content 3
      </div>
    </label>

    <label class="codex__page codex__page--middle-3">
      <div class="codex__page-front">
        Content 4
      </div>
      <div class="codex__page-back">
        Content 5
      </div>
    </label>
  </div>
</div>

<button on:click={back}>Back</button>
<button on:click={forward}>Forward</button>