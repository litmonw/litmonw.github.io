<template>
  <button class="mdc-button foo-button">
    <div class="mdc-button__ripple"></div>
    <span class="mdc-button__label">
      <slot />
    </span>
  </button>
</template>

<script>
import { MDCRipple } from '@material/ripple/index'


export default {
  name: 'app-button',
  mounted() {
    new MDCRipple(document.querySelector('.foo-button'));
  }
}
</script>

<style lang="scss">
// @use '@material/button/mdc-button';
// @use '@material/button';

// .foo-button {
  //  @include button.container-fill-color(darksalmon);
// }
</style>