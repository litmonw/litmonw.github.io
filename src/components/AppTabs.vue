<template>
  <nav class="tab-bar">
    <ul class="tab-bar-list">
      <li
        v-for="item in tabs"
        :key="item.id"
        class="tab-bar-item"
        :class="{'active': item.id === currentTabId}"
        @click="switchTab(item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppTabs',
  props: {
    currentTabId: {
      default: ''
    }
  },
  data() {
    return {
      // currentTabId: 'post',
      tabs: [
        {
          id: 'post',
          name: '文章',
        },
        {
          id: 'read',
          name: '读书'
        },
        {
          id: 'work',
          name: '作品集'
        }
      ]
    }
  },
  watch: {
    $route(to, from) {
      const routeName = this.$route.name
      if (this.tabs.map(item => item.id).includes(routeName)) {
      // this.currentTabId = routeName
        this.$emit('update: currentTabId', routeName)
      }
    }
  },
  mounted() {
    /* 当 tabs 存在变量 name 模块时，指向同名 tab */
    const routeName = this.$route.name
    if (this.tabs.map(item => item.id).includes(routeName)) {
      this.$emit('update: currentTabId', routeName)
    }
  },
  methods: {
    switchTab(id) {
      this.$emit('update: currentTabId', id)
      this.$router.push(`/${id}`)
    }
  }
}
</script>

<style lang="scss">
.tab-bar {
  position: relative;

  @media screen and (min-width: $screen-sm-min) {
    display: none;
  }

  &:after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e8eaed;
  }
}

.tab-bar-list {
  position: relative;
  display: flex;
  overflow-y: auto;
  align-items: center;
  margin: 0 auto;
  max-width: 960px;
  height: 44px;
  font-size: 14px;
  padding-left: 0;
}

.tab-bar-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 100%;
    cursor: pointer;

    &.active {
      color: $primary-color;
    }
}
</style>