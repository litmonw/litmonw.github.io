<template>
  <div id="app">
    <app-top-bar
      v-if="!specialPage"
      :current-tab-id.sync="currentTabId"
    />
    <router-view
      v-if="specialPage"
      @changeTab="changeTab"
    />
    <div
      v-else
      class="layout-main"
    >
      <!-- <keep-alive> -->
      <router-view
        @changeTab="changeTab"
      />
      <!-- </keep-alive> -->
    </div>
    <app-footer v-if="filterRouter" />
    <back-top />
  </div>
</template>

<script>
import BackTop from '../src/components/BackTop'
export default {
  name: 'App',
  components: {
    BackTop
  },
  data() {
    return {
      currentTabId: 'post'
    }
  },
  computed: {
    filterRouter() {
      const routePath = this.$route.path
      if (['/', '/post'].includes(routePath)) {
        return false
      }

      return true
    },
    specialPage() {
      const routePath = this.$route.path
      if (['/'].includes(routePath)) {
        return true
      }

      return false
    }
  },
  methods: {
    changeTab(name) {
      this.currentTabId = ''
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #f5f5f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}

.layout-main {
  margin-top: 101px;
  min-height: calc(100vh - 103px);
  padding-bottom: 24px;
  overflow: hidden;

  @media screen and (min-width: $screen-sm-min) {
    margin-top: 56px;  
  }
}
</style>
