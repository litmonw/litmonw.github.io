<template>
  <i
    :style="iconStyles"
    :class="name"
  />
</template>

<script>
export default {
  name: 'AppIcon',
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconStyles() {
      return {
        'font-size': this.size,
        color: this.color
      }
    }
  }
}
</script>

<style>

</style>