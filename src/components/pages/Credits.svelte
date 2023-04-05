<script lang="ts">
  import {staticLang} from "../../content/static-lang.js";
  import {language} from "../../stores.js";
  import {marked} from "marked";
</script>

<div class="credits-wrapper">
  <div class="authors">
    <div>
      {@html marked.parse(staticLang.author[$language])}
    </div>
    <div>
      {@html marked.parse(staticLang.illustrations[$language])}
    </div>
  </div>
  <div class="developer">
    <div>
      {@html marked.parse(staticLang.siteAuthor[$language])}
    </div>
    <div>
      {@html marked.parse(staticLang.source[$language])}
    </div>
    <div>
      {@html marked.parse(staticLang.sourceCode[$language])}
    </div>
  </div>
  <div class="additional">
    <div>
      {@html marked.parse(staticLang.background[$language])}
    </div>
    <div>
      {@html marked.parse(staticLang.font[$language])}
    </div>
    <div>
      {@html marked.parse(staticLang.favicon[$language])}
    </div>
    <div>
      {@html marked.parse(staticLang.globeIcon[$language])}
    </div>
  </div>
  <div class="year">
    <div>{staticLang.madeInToshkent[$language]}</div>
    <div>2023</div>
  </div>
</div>

<style lang="scss">
  .credits-wrapper {
    line-height: 2em;
    height: max-content;
  }

  :global {
    p {
      margin: 0;
    }
  }

  .authors, .developer, .additional {
    margin-bottom: 3em;
  }

  .year {
    text-align: center;
  }
</style>