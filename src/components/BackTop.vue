<template>
  <div
    class="back-top"
    :class="{'is-show': isShow}"
    @click="backTop"
  >
    <i class="ri-arrow-up-s-line" />
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {
      scrollTop: 0
    }
  },
  computed: {
    isShow() {
      const clientHeight = this.$utils.getClientHeight()
      if (this.scrollTop > clientHeight) {
        return true
      }
      return false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollTop = this.$utils.getScrollTop()
    },
    backTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.back-top {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 16px;
    bottom: 0;
    width: 40px;
    height: 40px;
    color: $primary-color;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid $primary-color;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .15);
    opacity: 0;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      color: #fff;
      background-color: $primary-color;
    }

    &.is-show {
      opacity: 1;
      bottom: 16px;
      transition: all .2s ease-in-out;
    }
}
</style>