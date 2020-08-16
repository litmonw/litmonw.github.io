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
          <div
            v-if="pageTotal > limit"
            class="feeds-footer"
          >
            <app-pagination
              v-model="currentPage"
              :total="pageTotal"
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
              文章标签
            </p>
            <div class="section-body">
              <span
                v-for="item in tags"
                :key="item.id"
              >
                <a :href="`/post/tag/${item}`">
                  <em>#</em>{{ item }}
                </a>
              </span>
            </div>
          </div>
          <div class="popular-posts">
            <p class="section-title">
              热门文章
            </p>
            <div class="section-body">
              <ul class="posts">
                <li
                  v-for="item in popularPosts"
                  :key="item.id"
                  class="post"
                  @click="openDetailPage(item)"
                >
                  <div class="post-title">
                    {{ item.title }}
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
      limit: 10,
      scrollTop: 0,
      pageWidth: 0,
      removeScrollPageWidth: 0,
      popularPosts: [],
      tags: [],
      pageTotal: 0
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
      const asideRightSpan = (width - 992) / 2
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

    this.getPopularPosts()
    this.getPostTags()

    this.pageWidth = window.innerWidth
    this.removeScrollPageWidth = document.body.clientWidth

    setTimeout(() => {
      this.removeScrollPageWidth = document.body.clientWidth
    }, 5000)

    window.addEventListener('scroll', this.handleScroll)
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
          page,
          limit: this.limit
        }
      }).then(res => {
        const feeds = res.data.data.list
        this.feeds = feeds
        this.pageTotal = res.data.data.total
      })
    },
    getPopularPosts() {
      this.$http.get('/post/popular/random', {
        params: {
          amount: 5
        }
      }).then(res => {
        if(![200, 204].includes(res.status)) {
          this.$notify('登录失败！服务器失去响应')
          return
        }

        this.popularPosts = res.data.data
      })
    },
    getPostTags() {
      this.$http.get('/post/tag/random', {
        params: {
          amount: 5
        }
      }).then(res => {
        // TODO: 为了更加符合页面美观，返回的数据应该组成每行 25%,75% 比例的宽度
        this.tags = res.data.data
      })
    },
    openDetailPage(item) {
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
  
  & > .post {
    margin: 16px auto 0;
    max-width: 992px;
  }
}

.feeds-container {
  display: flex;
  margin-top: 16px;

  .feeds {
    width: 732px;
    background-color: #fff;

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

    .about, .popular-posts {
      background-color: #fff;
      margin-bottom: 16px;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);

      .section-title {
        padding: 0 16px;
        height: 52px;
        line-height: 52px;
        font-size: 14px;
        border-bottom: 1px solid #f6f6f6;
      }

      .section-body {
        overflow: hidden;
      }
    }

    .popular-posts {
      .posts {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding-left: 0;
        list-style-type: none;

        .post {
          display: flex;
          width: 100%;
          padding: 12px 16px;
          cursor: pointer;

          &:hover {
            background-color: hsla(0,0%,84.7%,.1);
          }

          .post-title {
            display: -webkit-box;
            font-size: 14px;
            line-height: 24px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }

    .about {
      .section-body {
        display: flex;
        flex-wrap: wrap;
        padding-top: 10px;
      }

      span {
        padding: 0 10px;
        width: 50%;
        margin-bottom: 10px;

        a {
          display: block;
          padding: 0 10px;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color: #2c3e50;
          background-color: #f7fafa;
          border-radius: 4px;
          white-space: nowrap;
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            color: #fff;
            background-color: $primary-color;

            em {
              color: $primary-color;
              background-color: #fff;
            }
          }

          em {
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-right: 5px;
            font-size: 12px;
            line-height: 18px;
            background-color: #9199a1;
            border-radius: 50%;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>