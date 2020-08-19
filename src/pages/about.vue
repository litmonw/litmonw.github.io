<template>
  <div class="about-container">
    <div class="about-container-inner">
      <app-breadcrumb>
        <app-breadcrumb-item to="/">
          首页
        </app-breadcrumb-item>
        <app-breadcrumb-item>综合</app-breadcrumb-item>
        <app-breadcrumb-item>关于</app-breadcrumb-item>
      </app-breadcrumb>
      <div class="article">
        <h1 class="article-title">
          关于
        </h1>
        <div class="article-body">
          我还没有想好写些什么呢
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  beforeRouteUpdate(to, from, next) {
    console.log(to.query.page)
    next()
  },
  mounted() {
    this.$emit('changeTab', '')
  }
}
</script>

<style lang="scss" scoped>
.about-container {
  background-color: #f5f5f5;
  min-height: calc(100vh - 125px);
}

.about-container-inner {
  margin: 0 auto;
  padding-top: 16px;
  max-width: 960px;
}

.breadcrumb {
  margin-bottom: 16px;
  margin-left: 16px;
}

.article {
  background-color: #fff;
  padding: 0 24px 16px;
  overflow: hidden;

  .article-title {
    margin: 20px 0;
    font-size: 30px;
  }

  .article-body {
    min-height: 400px;
  }
}
</style>