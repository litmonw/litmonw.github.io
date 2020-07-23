<template>
  <div class="friends-container">
    <div class="friends-container-inner">
      <app-breadcrumb>
        <app-breadcrumb-item to="/">
          首页
        </app-breadcrumb-item>
        <app-breadcrumb-item>朋友</app-breadcrumb-item>
      </app-breadcrumb>
      <div class="friends">
        <div
          v-for="item in friends"
          :key="item.id"
          class="friend-item"
        >
          <div
            class="friend-item-inner"
            @click="openFriendLinkPage(item.link)"
          >
            <div class="friend-profile">
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
                <div class="friend-link">
                  {{ item.link }}
                </div>
              </div>
            </div>
            <div class="friend-desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Friends',
  data() {
    return {
      friends: []
    }
  },
  mounted() {
    this.$http.get('/friends/list').then(res => {
      this.friends = res.data.data
    })
  },
  methods: {
    openFriendLinkPage(url) {
      window.open(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.friends-container {
  background-color: #f5f5f5;
  min-height: calc(100vh - 125px);
}

.friends-container-inner {
  margin: 0 auto;
  padding-top: 16px;
  max-width: 960px;
}

.breadcrumb {
  margin-bottom: 16px;
}

.friends {
  display: flex;
  flex-wrap: wrap;
  font-size: 0;
  margin-left: -8px;
  margin-right: -8px;
  margin-bottom: -16px;
}

.friend-item {
  width: 100%;
  padding: 0 8px;
  margin-bottom: 16px;

  @media screen and (min-width: $screen-sm-min) {
    width: 50%;
  }

  @media screen and (min-width: $screen-md-min) {
    width: 25%;    
  }
}

.friend-item-inner {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: hsla(0,0%,84.7%,.1);
  }

  .friend-profile {
    display: flex;
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

    .friend-link {
      display: -webkit-box;
      font-size: 12px;
      color: #909090;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;

      &:hover {
        color: $primary-color;
      }
    }
  }

  .friend-desc {
    margin-top: 8px;
    font-size: 12px;
  }
}
</style>