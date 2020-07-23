<template>
  <span>
    <a
      class="breadcrumb-item-name"
      @click="openLinkPage(to)"
    >
      <slot />
    </a>
    <span class="breadcrumb-item-separator">/</span>
  </span>
</template>

<script>
export default {
  name: 'AppBreadcrumbItem',
  props: {
    to: {
      type: String,
      default: ''
    },
  },
  methods: {
    openLinkPage(to) {
      if (!to) {
        return false
      }

      this.$router.push(to)
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-item-name {
  color: #515a6e;
  cursor: pointer;

  &:hover {
    color: $primary-color;
  }

  .breadcrumb-item-separator {
    margin: 0 8px;
    color: #dcdee2;
  }
}
</style>