<script>
  let isTurnPage = false;

  function turnPage() {
      isTurnPage = !isTurnPage;
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

  .book {
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

      &--1 {
        cursor: pointer;
        overflow: hidden;

        img {
          width: 100%;
          max-width: 100%;
          height: auto;
        }
      }

      &--2 {
        position: absolute;
        right: 0;
        pointer-events: none;
        transform-style: preserve-3d;
        background-color: var(--page-bg);
        background-image: linear-gradient(90deg, rgba(227,227,227,1) 0%, rgba(247,247,247,0) 18%);
      }

      &--4 {
        cursor: pointer;
        padding: 0 calc(var(--baseline) * 3);
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

      .page__content {
        padding: var(--baseline);
        height: 100%;
        position: relative;
        text-align: center;
      }

      .page__number {
        position: absolute;
        bottom: var(--baseline);
        width: calc(100% - (var(--baseline) * 2));
        font-family: var(--title);
        font-size: calc(var(--base-size) * 0.67);
        text-align: center;
      }
    }

    &--page-2 .book__page--2 {
      transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform: rotateY(-180deg);
    }
  }
</style>

<div class="cover">
  <div class="book" class:book--page-2={isTurnPage}>
    <label class="book__page book__page--1">
      <div class="page__content">
        Content 1
      </div>
    </label>

    <label class="book__page book__page--4">
      <div class="page__content">
        Content 2
      </div>
    </label>

    <label class="book__page book__page--2">
      <div class="book__page-front">
        <div class="page__content">
          Content 3
        </div>
      </div>
      <div class="book__page-back">
        <div class="page__content">
          Content 4
        </div>
      </div>
    </label>
  </div>
</div>

<button on:click={turnPage}>Turn the page</button>