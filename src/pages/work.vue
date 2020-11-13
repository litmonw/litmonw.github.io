<template>
  <div class="work-container">
    <div class="work-container-inner">
      <div class="work-list">
        <div
          v-for="item in list"
          :key="item.id"
          class="list-item"
          @click="openDetailPage(item.id)"
        >
          <div class="card">
            <div class="card-cover">
              <img :src="item.cover">
            </div>
            <div class="card-inner">
              <div class="card-info">
                <p class="card-title">
                  {{ item.title }}
                </p>
                <p class="card-sub">
                  {{ item.desc }}
                </p>
              </div>
              <div class="card-footer">
                <div>{{ item.date }}</div>
                <span class="card-footer-tag">{{ item.tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-footer">
      <app-pagination
        v-if="pageTotal > limit"
        v-model="currentPage"
        :total="pageTotal"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  name: 'Work',
  data() {
    return {
      list: [
        // ['title', 'desc', 'date', 'tag', 'cover']
      ],
      currentPage: 1,
      limit: 10,
      pageTotal: 0
    }
  },
  mounted() {
    const page = this.$route.query.page || 1
    this.currentPage = parseInt(page)

    // this.getList(page)
    this.fetchWorks()
      .then(res => {
        console.log(res)
        const list = res.list
        this.list = list
        this.pageTotal = res.total
      })
  },
  methods: {
    ...mapActions(['fetchWorks']),
    changePage(page) {
      this.$router.push({
        path: '/work',
        query: {
          page
        }
      })
    },
    // getList(page) {
    //   this.$http.get('/project/list', {
    //     params: {
    //       page,
    //       limit: this.list
    //     }
    //   }).then(res => {
    //     const list = res.data.data.list
    //     this.list = list
    //     this.pageTotal = res.data.data.total
    //   })
    // },
    openDetailPage(id) {
      const routeUrl = this.$router.resolve({
        name: 'workDetail',
        params: {
          id
        }
      })

      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.work-container {
  background-color: #f5f5f5;

  .work-container-inner {
    margin: 0 auto;
    padding-top: 16px;
    max-width: 1000px;
  }
}

.work-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
  margin-bottom: -16px;

  .list-item {
    padding: 0 8px;
    margin-bottom: 16px;

    @media screen and (min-width: 600px) {
      width: 50%;
    }

    @media screen and (min-width: $screen-sm-min) {
      width: 33.33%;
    }

    @media screen and (min-width: $screen-md-min) {
      width: 25%;
    }

    .card {
      position: relative;
      font-size: 0;
      background-color: #fff;
      cursor: pointer;
      transition: transofrm 0.5s;
      border-radius: 3px;
      overflow: hidden;

      .card-cover {
        position: relative;
        height: 150px;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          opacity: 0;
          transition: opacity 0.2s;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .card-inner {
        height: 100px;
        font-size: 14px;
        position: relative;

        .card-info {
          position: relative;
          top: 0;
          padding: 20px 16px 0;
          height: 100%;
          overflow: hidden;
          background-color: #fff;
          transition: top 0.3s ease-out;

          .card-title {
            margin-bottom: 8px;
            font-size: 16px;
            line-height: 19px;
            font-weight: 500;
          }

          .card-sub {
            display: -webkit-box;
            font-size: 13px;
            line-height: 1.4;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #2c3e50;
          }
        }

        .card-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 0 16px;
          height: 53px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          color: #8590a6;
          font-size: 12px;

          .card-footer-tag {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            line-height: 18px;
            background-color: #ffc500;
            color: #fff;
          }
        }
      }

      &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

        .card-cover::before {
          opacity: 1;
        }

        .card-inner .card-info {
          top: -55px;
          transition: top 0.3s ease-out;
        }
      }
    }
  }
}

.container-footer {
  display: flex;
  justify-content: center;
  padding-top: 24px;
}
</style>