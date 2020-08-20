<template>
  <div class="read-container">
    <ul class="feed">
      <li
        v-for="item in books"
        :key="item.id"
        class="feed-item"
      >
        <div class="feed-card">
          <img
            class="feed-cover"
            :src="item.cover"
          >
          <div class="feed-info">
            <p class="feed-title">
              {{ item.title }}
            </p>
            <p class="feed-field">
              {{ item.author }} / {{ item.year }} / {{ item.publisher }}
            </p>
            <div class="feed-mark">
              <div class="mark-title">
                <div class="mark-star">
                  <span
                    v-for="number in 5"
                    :key="number.id"
                    class="fs-20 material-icons"
                  >
                    {{ item.score >= number ? 'star' : 'star_outline' }}
                  </span>
                </div>
                <span class="mark-date">{{ item.date }}</span>
              </div>
              <div class="mark-content">
                {{ item.remark }}
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="read-footer">
      <app-pagination
        v-if="pageTotal > limit"
        v-model="currentPage"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageRead',
  data() {
    return {
      books: [
        ['title', 'author', 'year', 'publisher', 'cover', 'score', 'date', 'remark']
      ],
      limit: 10,
      currentPage: 1,
      pageTotal: 0
    }
  },
  beforeRouteUpdate(to, from, next) {
    const page = to.query.page
    this.currentPage = page
    this.getList(page)
    next()
  },
  mounted() {
    const page = this.$route.query.page || 1
    this.currentPage = parseInt(page)

    this.getList(page)
  },
  methods: {
    changePage(page) {
      this.$router.push({
        path: '/read',
        query: {
          page
        }
      })
    },
    getList(page) {
      this.$http.get('/book/list', {
        params: {
          page,
          limit: this.limit
        }
      }).then(res => {
        const books = res.data.data.list
        this.books = books
        this.pageTotal = res.data.data.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.read-container {
  margin: 0 auto;
  max-width: 960px;
}

.feed {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding-left: 0;
  list-style-type: none;

  @media screen and (min-width: $screen-md-min) {
    margin-left: -8px;
    margin-right: -8px;
  }
}

.feed-item {
  position: relative;
  width: 100%;
  margin-top: 16px;
  list-style-type: none;

  @media screen and (min-width: $screen-md-min) {
    width: 50%;
    padding: 0 8px;
  }

  .feed-card {
    display: flex;
    padding: 16px 16px 17px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    .feed-cover {
      width: 100px;
      height: 140px;
    }

    .feed-info {
      flex-grow: 1;
      margin-left: 12px;
      font-size: 14px;
      color: #818181;
    }

    .feed-title {
      font-weight: 500;
      font-size: 18px;
      color: #2c3e50;
    }

    .feed-field {
      margin-top: 4px;
    }

    .feed-mark {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      padding: 12px;
      background-color: #f7f7f7;
      border-radius: 3px;

      .mark-title {
        display: flex;
        font-size: 0;

        .mark-star {
          color: #ffc160;
        }

        .mark-date {
          margin-left: 8px;
          font-size: 14px;
          line-height: 1.5;
        }
      }

      .mark-content {
        display: -webkit-box;
        margin-top: 8px;
        height: 64px;
        overflow: hidden;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        word-break: break-word;
        text-overflow: ellipsis;
      }
    }
  }
}

.read-footer {
  display: flex;
  justify-content: center;
  padding-top: 24px;
}

.fs-20 {
  font-size: 20px;
}
</style>