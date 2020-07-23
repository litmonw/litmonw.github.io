<template>
  <div class="read-container">
    <ul class="feed">
      <li
        v-for="item in books"
        :key="item.id"
        class="feed-item"
      >
        <div class="feed-card">
          <img class="feed-cover" :src="item.cover" />
          <div class="feed-info">
            <p class="feed-title">{{ item.title }}</p>
            <p class="feed-field">{{ item.author }} / {{ item.year}} / {{ item.publisher }}</p>
            <div class="feed-mark">
              <div class="mark-title">
                <div class="mark-star">
                  <span v-for="number in 5" class="fs-20 material-icons">{{ number <= item.score ? 'star' : 'star_outline' }}</span>
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
        v-model="currentPage"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-read',
  data() {
    return {
      books: [
        {
          title: '如何阅读一本书',
          author: '[美] 莫提默·J. 艾德勒 / 查尔斯·范多伦',
          year: '2004',
          publisher: '商务印书馆',
          cover: require('../assets/img/s1670978.jpg'),
          score: 3,
          date: '2018-06-05',
          remark: '莫提默·J. 艾德勒（1902－2001）以学者、教育家、编辑人等多重面貌享有盛名。除了写作《如何阅读一本书》外，以主编《西方世界的经典人并担任1974年第十五版《大英百科全书》的编辑相异而闻名于世。'
        },
        {
          title: '如何阅读一本书',
          author: '[美] 莫提默·J. 艾德勒 / 查尔斯·范多伦',
          year: '2004',
          publisher: '商务印书馆',
          cover: require('../assets/img/s1670978.jpg'),
          score: 4,
          date: '2018-06-05',
          remark: '莫提默·J. 艾德勒（1902－2001）以学者、教育家、编辑人等多重面貌享有盛名。除了写作《如何阅读一本书》外，以主编《西方世界的经典人并担任1974年第十五版《大英百科全书》的编辑相异而闻名于世。'
        },
        {
          title: '如何阅读一本书',
          author: '[美] 莫提默·J. 艾德勒 / 查尔斯·范多伦',
          year: '2004',
          publisher: '商务印书馆',
          cover: require('../assets/img/s1670978.jpg'),
          score: 4,
          date: '2018-06-05',
          remark: '莫提默·J. 艾德勒（1902－2001）以学者、教育家、编辑人等多重面貌享有盛名。除了写作《如何阅读一本书》外，以主编《西方世界的经典人并担任1974年第十五版《大英百科全书》的编辑相异而闻名于世。'
        },
        {
          title: '如何阅读一本书',
          author: '[美] 莫提默·J. 艾德勒 / 查尔斯·范多伦',
          year: '2004',
          publisher: '商务印书馆',
          cover: require('../assets/img/s1670978.jpg'),
          score: 4,
          date: '2018-06-05',
          remark: '莫提默·J. 艾德勒（1902－2001）以学者、教育家、编辑人等多重面貌享有盛名。除了写作《如何阅读一本书》外，以主编《西方世界的经典人并担任1974年第十五版《大英百科全书》的编辑相异而闻名于世。'
        },
        {
          title: '如何阅读一本书',
          author: '[美] 莫提默·J. 艾德勒 / 查尔斯·范多伦',
          year: '2004',
          publisher: '商务印书馆',
          cover: require('../assets/img/s1670978.jpg'),
          score: 4,
          date: '2018-06-05',
          remark: '莫提默·J. 艾德勒（1902－2001）以学者、教育家、编辑人等多重面貌享有盛名。除了写作《如何阅读一本书》外，以主编《西方世界的经典人并担任1974年第十五版《大英百科全书》的编辑相异而闻名于世。'
        }
      ],
      currentPage: 1
    }
  },
  methods: {
    changePage(page) {
      this.$router.push({
        path: '/read',
        query: {
          page
        }
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
        margin-top: 8px;
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