<template>
  <div id="app">
    <app-top-bar
      :current-tab-id.sync="currentTabId"
    />
    <div class="layout-main">
      <!-- <keep-alive> -->
      <router-view
        @changeTab="changeTab"
      />
      <!-- </keep-alive> -->
    </div>
    <app-footer v-if="filterRouter" />
  </div>
</template>

<script>

export default {
  name: 'App',
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
    }
  },
  methods: {
    changeTab(name) {
      this.currentTabId = '';
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
