<template>
  <div class="work-container">
    <div class="work-container-inner">
      <div class="work-list">
        <div
          v-for="item in list"
          :key="item.id"
          class="list-item"
        >
          <div class="card">
            <img :src="item.cover">
            <div class="card-inner">
              <p class="card-title">
                {{ item.title }}
              </p>
              <p class="card-sub">
                {{ item.desc }}
              </p>
              <div class="card-footer">
                <div>{{ item.tag[0] }}/{{ item.tag[1] }}</div>
                <div>{{ item.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-footer">
      <app-pagination
        v-model="currentPage"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Work',
  data() {
    return {
      list: [
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
        {
          title: 'Litmonw 官网',
          desc: '一个神奇的网站',
          date: '2019-03-21',
          tag: ['前端', '跨栈'],
          cover: require('../assets/img/banner.jpg')
        },
      ],
      currentPage: 1
    }
  },
  methods: {
    changePage(page) {
      this.$router.push({
        path: '/post',
        query: {
          page
        }
      })
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
    max-width: 960px;
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

    @media screen and (min-width: $screen-sm-min) {
      width: 33.33%;
    }

    .card {
      font-size: 0;
      background-color: #fff;
      border-radius: 3px;
      cursor: pointer;
      transition: transofrm .5s;
      transform: translateY(0);

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .1);
      }

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .card-inner {
        font-size: 14px;
        padding: 8px 16px 16px;

        .card-title {
          font-size: 18px;
          font-weight: 500;
          line-height: 30px;
        }

        .card-sub {
          font-size: 16px;
          color: #2c3e50;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          color: #8590a6;
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