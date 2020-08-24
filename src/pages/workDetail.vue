<template>
  <div class="work-container">
    <div class="banner">
      <div class="banner-container">
        <app-breadcrumb>
          <app-breadcrumb-item to="/">
            首页
          </app-breadcrumb-item>
          <app-breadcrumb-item to="/work">
            文章
          </app-breadcrumb-item>
          <app-breadcrumb-item>详情</app-breadcrumb-item>
        </app-breadcrumb>
        <div class="banner-title">
          <h2>生活在云上，相约在云上</h2>
          <p>我的个人博客，分享我的知识与经验我的个人博客，分享我的知识与经验我的个人博客我的个人博客我的个人博客我的个人博客</p>
        </div>
        <div class="work-nav">
          <router-link
            :to="`/work/${id}/description`"
          >
            <div
              class="work-nav-item"
              :class="{'active': sectionName === 'description'}"
            >
              <app-icon
                name="ri-home-smile-line"
              />
              <span>介绍</span>
            </div>
          </router-link>
          <router-link
            :to="`/work/${id}/download`"
          >
            <div
              class="work-nav-item"
              :class="{'active': sectionName === 'download'}"
            >
              <app-icon
                name="ri-file-download-line"
              />
              <span>下载</span>
            </div>
          </router-link>
          <router-link
            :to="`/work/${id}/comment`"
          >
            <div class="work-nav-item">
              <app-icon
                name="ri-discuss-line"
              />
              <span>评论</span>
            </div>
          </router-link>
          <router-link
            :to="`/work/${id}/post`"
          >
            <div class="work-nav-item">
              <app-icon
                name="ri-article-line"
              />
              <span>文章</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="section-area">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkDetail',
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      sectionName: 'description'
    }
  },
  watch: {
    $route() {
      this.getPath()
    }
  },
  mounted() {
    this.getPath()
  },
  methods: {
    getPath() {
      const fullPath = this.$route.fullPath.split('/')
      const lastPath = fullPath[fullPath.length - 1]
      if (!['description', 'download', 'comment', 'post'].includes(lastPath)) {
        this.sectionName = 'description'
        return false
      }
      this.sectionName = lastPath
    }
  }
}
</script>

<style lang="scss" scoped>
.work-container {
  background-color: #f5f5f5;
  min-height: calc(100vh - 125px);
}

::v-deep {
  .breadcrumb {
    margin-top: 16px;

    .breadcrumb-item-name {
      color: #fff;
    }
  }
}

.banner {
  position: relative;
  z-index: 1;
  background: url('~@assets/img/work-banner.jpg');
  background-attachment: fixed;
  background-color: cover;
  overflow: hidden;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #2b2b2b;
    opacity: 0.6;
    position: absolute;
    z-index: -1;
  }

  .banner-container {
    position: relative;
    margin: 0 auto;
    max-width: 980px;
    padding: 0 16px 62px;
    color: #fff;

    @media screen and (min-width: 1012px) {
      padding-left: 0;
      padding-right: 0;
    }

    @media screen and (min-width: $screen-sm-min) {
      padding-bottom: 88px;
    }

    .banner-title {
      overflow: hidden;

      @media screen and (min-width: $screen-sm-min) {
        margin: 0;

        h2 {
          font-size: 36px;
        }
      }

      h2 {
        margin: 32px 0;
        font-size: 32px;
        font-weight: 600;
      }

      p {
        line-height: 1.5;
      }
    }
  }

  .work-nav {
    display: flex;
    position: absolute;
    margin: 0 auto;
    padding-left: 16px;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 800px;
    overflow-x: auto;

    a {
      text-decoration: none;
    }

    @media screen and (min-width: $screen-sm-min) {
      padding-left: 0;
    }

    .work-nav-item {
      flex-shrink: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 0;
      padding: 6px 12px;
      width: 86px;
      height: 46px;
      color: rgba($color: #fff, $alpha: 0.6);
      border-radius: 4px 4px 0 0;
      cursor: pointer;

      i {
        block-size: 24px;
        font-size: 24px;
      }

      span {
        font-size: 15px;
      }

      @media screen and (min-width: $screen-sm-min) {
        margin-right: 32px;
        padding: 12px 24px;
        width: 122px;
        height: 60px;

        i {
          block-size: 30px;
          font-size: 30px;
        }

        span {
          font-size: 16px;
        }
      }

      &:hover {
        color: #fff;
      }

      &.active {
        color: $primary-color;
        background-color: #f5f5f5;

        span {
          color: #2c3e50;
        }
      }
    }
  }
}
</style>