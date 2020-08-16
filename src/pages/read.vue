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

.book-container {
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 600px;
}

@keyframes initAnimation {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-30deg);
  }
}

.book {
  width: 200px;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(-30deg);
  transition: 1s ease;
  animation: 1s ease 0s 1 initAnimation;
}

.book:hover {
  transform: rotateY(0deg);
}

.book > :first-child {
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  width: 200px;
  height: 300px;
  transform: translateZ(25px);
  background-color: #01060f;
  border-radius: 0 2px 2px 0;
  box-shadow: 5px 5px 20px #666;
}

.book::before {
  position: absolute;
  content: ' ';
  background-color: blue;
  left: 0;
  top: 3px;
  width: 48px;
  height: 294px;
  transform: translateX(172px) rotateY(90deg);
  background: linear-gradient(90deg, 
    #fff 0%,
    #f9f9f9 5%,
    #fff 10%,
    #f9f9f9 15%,
    #fff 20%,
    #f9f9f9 25%,
    #fff 30%,
    #f9f9f9 35%,
    #fff 40%,
    #f9f9f9 45%,
    #fff 50%,
    #f9f9f9 55%,
    #fff 60%,
    #f9f9f9 65%,
    #fff 70%,
    #f9f9f9 75%,
    #fff 80%,
    #f9f9f9 85%,
    #fff 90%,
    #f9f9f9 95%,
    #fff 100%
    );
}

.book::after {
  position: absolute;
  top: 0;
  left: 0;
  content: ' ';
  width: 200px;
  height: 300px;
  transform: translateZ(-25px);
  background-color: #01060f;
  border-radius: 0 2px 2px 0;
  box-shadow: -10px 0 50px 10px #666;
}
</style>