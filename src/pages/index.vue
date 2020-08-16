<template>
  <div class="home-container">
    <h1 class="logo">
      牧屋
    </h1>
    <div class="banner-wrap">
      <banner-card />
    </div>
    <div class="section-nav">
      <div class="section-content">
        <div
          v-for="item in sectionList"
          :key="item.id"
          class="section"
        >
          <div
            class="section-inner"
            @click="jumpToSectionPage(item.path)"
          >
            <div class="section-icon">
              <app-icon :name="item.icon" />
            </div>
            <div class="section-info">
              <h3 class="section-name">
                {{ item.name }}
              </h3>
              <h4 class="section-desc">
                {{ item.desc }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div
        class="footer-left"
        @click="jump"
      >
        <span data-section="about">关于</span>
        <span data-section="friends">朋友</span>
      </div>
      <div class="footer-right">
        <span>@2020</span>
        <span>蜀ICP备13013524号</span>
      </div>
    </footer>
  </div>
</template>

<script>
import BannerCard from '../components/BannerCard'

export default {
  name: 'PageHome',
  components: {
    BannerCard
  },
  data() {
    return {
      sectionList: [
        {
          name: '文章',
          desc: '为求一字稳，耐得半宵寒',
          icon: 'ri-article-line',
          path: 'post'
        },
        {
          name: '读书',
          desc: '腹有诗书气自华',
          icon: 'ri-book-2-line',
          path: 'read'
        },
        // {
        //   name: '观影',
        //   desc: '体味人生百态，尝尽酸甜苦辣',
        //   icon: 'ri-video-chat-line',
        //   path: 'movie'
        // },
        // {
        //   name: '摄影',
        //   desc: '记录每一个瞬间',
        //   icon: 'ri-camera-line',
        //   path: 'photograph'
        // },
        // {
        //   name: '游戏',
        //   desc: '凡是过往，皆为序章',
        //   icon: 'ri-gamepad-line',
        //   path: 'game'
        // },
        {
          name: '作品集',
          desc: '一勤天下无难事',
          icon: 'ri-computer-line',
          path: 'work'
        }
      ]
    }
  },
  beforeRouteUpdate(to, from, next) {
    const page = to.query.page
    this.currentPage = page
    this.getList(page)
    next()
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    jumpToSectionPage(path) {
      this.$router.push(`/${path}`)
    },
    jump(e) {
      const sectionName = e.target.getAttribute('data-section')
      this.$router.push(`/${sectionName}`)
    }
  }
}
</script>

<style lang="scss" scoped>

.home-container {
  // background: #00c6ff;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to left, #0072ff, #00c6ff);  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to left, #0072ff, #00c6ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  // background-image: linear-gradient(#e66465, #9198e5);
  position: relative;
  padding-bottom: 40px;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fff;

  .banner-wrap {
    max-width: 980px;
    margin: 0 auto;
    margin-top: 16px;
  }
}

.logo {
  margin-top: 40px;
  margin-bottom: 0;
  font-size: 36px;
  text-align: center;
}

.section-nav {
  margin: 20px auto 0;
  max-width: 948px;

  .section-content {
    display: flex;
    flex-wrap: wrap;

    .section {
      padding: 0 4vw;
      width: 100%;
      height: 113px;
      margin-bottom: 20px;

      @media screen and (min-width: $screen-sm-min) {
        width: 50%;
        padding: 0 16px;
      }

      @media screen and (min-width: $screen-md-min) {
        width: 33.3%;
      }

      .section-inner {
        display: flex;
        height: 100%;
        padding: 36px 20px 0;
        border: 1px solid #f3f3f3;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
          background-color: $primary-color;
          border: 1px solid $primary-color;
          box-shadow: 0 8px 12px 0 rgba(0, 132, 255, .2);

          .section-icon , .section-name, .section-desc {
            color: #fff;
          }
        }
      }

      .section-icon {
        font-size: 32px;
        color: $primary-color;
      }

      .section-info {
        display: flex;
        flex-direction: column;
        margin-left: 20px;

        .section-name {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
        }

        .section-desc {
          margin-top: 10px;
          margin-bottom: 0;
          font-size: 14px;
          color: #888;
        }
      }
    }
  }
}

footer {
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  font-size: 14px;
  background-color: #f5f5f5;
  color: #bbb;
  border-top: 1px solid hsla(0,0%,100%, .1);

  @media screen and (min-width: $screen-sm-min) {
    font-size: 12px;
  }

  .footer-left {
    span {
      margin-right: 20px;
      color: #888;
      cursor: pointer;
    }
  }

  .footer-right {
    span {
      margin-left: 20px;
    }
  }
}
</style> 