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
            <div class="friend-avatar">
              <img
                :src="item.avatar"
                alt="friend-avatar"
              >
            </div>
            <div class="friend-name">
              {{ item.name }}
            </div>
            <div class="friend-info">
              <span class="friend-desc">
                {{ item.desc }}
              </span>
              <div class="friend-link">
                <span>访问主页</span>
                <app-icon
                  style="margin-left: 4px;"
                  name="ri-external-link-line"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  name: 'Friends',
  data() {
    return {
      // friends: []
    }
  },
  computed: {
    ...mapState(['friends'])
  },
  mounted() {
    // this.$http.get('/friends/list').then(res => {
    //   this.friends = res.data.data
    // })

    this.fetchFriends()
  },
  methods: {
    ...mapActions(['fetchFriends']),
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
  max-width: 980px;
  border-radius: 4px;
}

.breadcrumb {
  margin-bottom: 16px;
  margin-left: 16px;
}

.friends {
  display: flex;
  flex-wrap: wrap;
  font-size: 0;
  margin-left: -8px;
  margin-right: -8px;
  padding: 0 16px;
  margin-bottom: -16px;
}

.friend-item {
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 0 8px;
  margin-bottom: 16px;

  @media screen and (min-width: $screen-sm-min) {
    width: 33.33%;
  }

  @media screen and (min-width: $screen-md-min) {
    width: 25%;
  }
}

.friend-item-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  @media screen and (min-width: $screen-sm-min) {
    width: 100%;
  }

  .friend-avatar {
    margin-top: 16px;
    text-align: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .friend-name {
    margin-top: 9px;
    line-height: 20px;
    font-size: 16px;
    color: #333;
    text-align: center;
  }

  .friend-info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px 16px;
    height: 70px;
    font-size: 14px;
    color: #818181;

    .friend-desc {
      display: -webkit-box;
      height: 42px;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .friend-link {
      display: none;
      padding: 0 8px;
      height: 32px;
      line-height: 32px;
      color: #0084ff;
      border: 1px solid #0084ff;
    }
  }

  @media screen and (min-width: $screen-md-min) {
    &:hover {
      transform: scale(1.05);

      .friend-info {
        .friend-desc {
          display: none;
        }

        .friend-link {
          display: inline-flex;
          align-items: center;
        }
      }
    }
  }
}
</style>