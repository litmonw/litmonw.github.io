<template>
  <div class="breadcrumb">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
}
</script>

<style lang="scss" scoped>

.breadcrumb {
  font-size: 14px;
}

::v-deep {
  span:last-child {
    .breadcrumb-item-name {
      font-weight: 700;
      cursor: text;
      
      &:hover {
        color: #515a6e;
      }
    }

    .breadcrumb-item-separator {
      display: none;
    }
  }
}
</style>