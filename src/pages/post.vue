<template>
  <div class="post-container">
    <div class="post">
      <div class="feeds-container">
        <div
          class="feeds"
          :style="feedsStyle"
        >
          <feed-card
            v-for="item in feeds"
            :key="item.id"
            :feed="item"
            @click.native="openDetailPage(item)"
          />
          <div class="feeds-footer">
            <app-pagination
              v-model="currentPage"
              @change-page="changePage"
            />
          </div>
        </div>
        <aside
          :style="{ 'right' : stickRightSpan }"
          class="aside"
          :class="{ 'is-fixed': overflowHeader }"
        >
          <div class="about">
            <p class="section-title">
              关于
            </p>
            <div class="section-body">
              <img
                class="avatar"
                src="../assets/img/avatar.png"
                alt="avatar"
              >
              <p class="author-name">
                litmonw
              </p>
              <p class="author-desc">
                Coding is a Superpower！
              </p>
              <div class="social-list">
                <i class="iconfont icon-zhihu" />
                <i class="iconfont icon-weibo" />
                <i class="iconfont icon-yuque" />
                <i class="iconfont icon-github" />
              </div>
            </div>
          </div>
          <div class="friends">
            <p class="section-title">
              朋友
            </p>
            <div class="section-body">
              <ul class="friend-list">
                <li
                  v-for="item in friends.slice(0, 2)"
                  :key="item.id"
                  class="friend-item"
                >
                  <div class="friend-avatar">
                    <img
                      :src="item.avatar"
                      alt="friend-avatar"
                    >
                  </div>
                  <div class="friend-info">
                    <div class="friend-name">
                      {{ item.name }}
                    </div>
                    <div class="friend-desc">
                      {{ item.desc }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <micro-footer />
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import FeedCard from '../components/FeedCard'
import MicroFooter from '../components/MicroFooter'

export default {
  name: 'PageIndex',
  components: {
    FeedCard,
    MicroFooter
  },
  data() {
    return {
      feeds: [],
      currentPage: 1,
      scrollTop: 0,
      pageWidth: 0,
      removeScrollPageWidth: 0,
      friends: []
    }
  },
  beforeRouteUpdate(to, from, next) {
    const page = to.query.page
    this.currentPage = page
    this.getList(page)
    next()
  },
  computed: {
    stickRightSpan() {
      const width = this.removeScrollPageWidth
      const asideRightSpan = (width - 960) / 2
      return `${ asideRightSpan > 0 ? asideRightSpan : 0 }px`
    },
    overflowHeader() {
      if (this.scrollTop > 416) {
        return true
      }
      return false
    },
    feedsStyle() {
      if (this.pageWidth < 768) {
        return {}
      }

      return {'margin-right': this.overflowHeader ? '260px' : '20px'}
    }
  },
  mounted() {
    const page = this.$route.query.page || 1
    this.currentPage = parseInt(page)
    this.getList(page)

    this.getFriends()

    this.pageWidth = window.innerWidth
    this.removeScrollPageWidth = document.body.clientWidth

    window.addEventListener('scroll',this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    changePage(page) {
      this.$router.push({
        path: '/post',
        query: {
          page
        }
      })
      // this.$router.push({
      //   name: 'post',
      //   params: {
      //     page
      //   }
      // })
    },
    getList(page) {
      this.$http.get('/post/list', {
        params: {
          offset: page
        }
      }).then(res => {
        const feeds = res.data.data
        this.feeds = feeds
      })
    },
    getFriends() {
      this.$http.get('/friends/list').then(res => {
        if(![200, 204].includes(res.status)) {
          this.$notify('登录失败！服务器失去响应')
          return
        }

        this.friends = res.data.data
      })
    },
    openDetailPage(item) {
      console.log(item)
      this.$router.push({
        name: 'postDetail',
        params: {
          id: item.id
        }
      })
    },
    handleScroll() {
      this.scrollTop = this.$utils.getScrollTop()
    },
    handleResize() {
      this.pageWidth = window.innerWidth
      this.removeScrollPageWidth = document.body.clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.post-container {
  background-color: #f5f5f5;
  min-height: calc(100vh - 101px);
  overflow: hidden;
  
  .post {
    margin: 16px auto 0;
    max-width: 992px;
  }
}

.feeds-container {
  display: flex;
  margin-top: 16px;

  .feeds {
    background-color: #fff;
    flex-grow: 1;

    .feeds-footer {
      display: flex;
      justify-content: center;
      padding-top: 24px;
      padding-bottom: 24px;
    }
  }

  .aside {
    flex-shrink: 0;
    right: 0;
    top: 73px;
    width: 240px;
    display: none;

    &.is-fixed {
      position: fixed;
    }

    @media screen and (min-width: $screen-sm-min) {
      display: block;
    }

    .about, .friends {
      background-color: #fff;
      margin-bottom: 16px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);

      .section-title {
        padding: 12px 16px;
        font-size: 14px;
        border-bottom: 1px solid #e8eaed;
      }

      .section-body {
        overflow: hidden;

        .avatar {
          display: block;
          margin: 12px auto 6px;
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }

        .author-name {
          font-size: 18px;
          line-height: 24px;
          font-weight: 500;
          text-align: center;
        }

        .author-desc {
          font-size: 14px;
          line-height: 20px;
          text-align: center;
        }

        .social-list {
          display: flex;
          justify-content: space-around;
          margin-top: 8px;
          margin-bottom: 8px;
          cursor: pointer;

          i {
            font-size: 32px;
            color: #8590a6;

            &:hover {
              color: #0084ff;
            }
          }
        }

        .friend-list {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding-left: 0;
          list-style-type: none;

          .friend-item {
            display: flex;
            width: 100%;
            padding: 12px 16px;
            cursor: pointer;

            &:hover {
              background-color: hsla(0,0%,84.7%,.1);
            }

            .friend-avatar {
              flex-shrink: 0;
              width: 46px;
              height: 46px;
              background-color: #eee;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .friend-info {
              margin-left: 12px;

              .friend-name {
                font-size: 14px;
                line-height: 20px;
                color: #333;
              }

              .friend-desc {
                display: -webkit-box;
                font-size: 12px;
                color: #909090;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
  }
}
</style>