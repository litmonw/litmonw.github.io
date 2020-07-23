<template>
  <header class="layout-header">
    <div>
      <div class="layout-header-inner">
        <section>
          <button
            class="menu blank-btn material-icons"
            @click="showSidebar"
          >
            menu
          </button>
          <router-link
            class="header-logo"
            to="/"
          >
            Litmonw
          </router-link>
        </section>
        <section class="header-right">
          <ul class="module-list">
            <li
              v-for="item in tabs"
              :class="{'active': item.id === currentTabId}"
              class="module"
              @click="switchTab(item.id)"
            >
              <span>{{ item.name }}</span>
            </li>
          </ul>
          <button
            class="blank-btn material-icons"
            @click="showSearchPanel"
          >
            search
          </button>
        </section>
      </div>
      <!-- TODO: 更多 -->
      <!-- 更多 -->
      <div
        class="popup-inner"
        :class="{'active': sidebarStatus}"
      >
        <div class="popup-body">
          <div class="profile">
            <img
              class="profile-avatar"
              src="../assets/img/avatar.png"
              alt="avatar"
            >
            <div class="profile-info">
              <p class="profile-name">
                Litmonw
              </p>
              <p class="profile-desc">
                Coding is a super power!
              </p>
            </div>
          </div>
          <ul class="more-list">
            <li @click="openAboutPage">
              <router-link
                class="item-link"
                to="about"
              >
                <span class="material-icons">people_outline</span>
                <span class="name">关于</span>
              </router-link>
            </li>
            <li @click="openLinkPage">
              <router-link
                class="item-link"
                to="link"
              >
                <span class="material-icons">info_outline</span>
                <span class="name">社区</span>
              </router-link>
            </li>
            <li @click="openFriendsPage">
              <router-link
                class="item-link"
                to="friends"
              >
                <span class="material-icons">link</span>
                <span class="name">朋友</span>
              </router-link>
            </li>
          </ul>
          <!-- 备案号与版权声明 -->
          <micro-footer style="padding: 0 16px" />
        </div>
      </div>
      <div
        v-show="sidebarStatus"
        class="mask"
        @click="closeSidebar"
      />
    </div>
    <div
      v-if="searchPanelStatus"
      class="search"
    >
      <button
        class="blank-btn material-icons"
        @click="searchKeyword"
      >
        search
      </button>
      <input
        ref="searchInput"
        v-model="keyword"
        type="search"
        placeholder="搜索关键词"
      >
      <button
        class="blank-btn material-icons"
        @click="closeSearchPanel"
      >
        close
      </button>
    </div>
    <div
      v-show="searchPanelStatus"
      class="mask"
      @click="closeSearchPanel"
    />
    </div>
    </div>
    <app-tabs :current-tab-id.sync="currentTabId" />
  </header>
</template>

<script>
import MicroFooter from '../components/MicroFooter';

export default {
  name: 'AppTopBar',
  components: {
    MicroFooter
  },
  props: {
    currentTabId: {
      default: ''
    }
  },
  data() {
    return {
      sidebarStatus: false,
      searchPanelStatus: false,
      keyword: '',
      tabs: [
        {
          id: 'post',
          name: '文章',
        },
        {
          id: 'read',
          name: '读书'
        },
        {
          id: 'work',
          name: '作品集'
        }
      ]
    }
  },
  watch: {
    $route(to, from) {
      const routeName = this.$route.name
      if (this.tabs.map(item => item.id).includes(routeName)) {
        this.$emit('update:currentTabId', routeName)
      }
    }
  },
  mounted() {
    /* 当 tabs 存在变量 name 模块时，指向同名 tab */
    const routeName = this.$route.name
    if (this.tabs.map(item => item.id).includes(routeName)) {
      this.$emit('update:currentTabId', routeName)
    }
  },
  methods: {
    switchTab(id) {
      this.$emit('update:currentTabId', id)
      this.$router.push(`/${id}`)
    },
    showSidebar() {
      this.sidebarStatus = true;
    },
    closeSidebar() {
      this.sidebarStatus = false;
    },
    showSearchPanel() {
      this.keyword = '';
      this.searchPanelStatus = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      })
    },
    closeSearchPanel() {
      this.searchPanelStatus = false;
    },
    openAboutPage() {

    },
    openLinkPage() {

    },
    openFriendsPage() {

    },
    searchKeyword() {
      // TODO: 跳转到搜索页
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  @media screen and (min-width: $screen-sm-min) {
    display: none;
  }
}

.layout-header {
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid rgba(26,26,26,.06);
  box-shadow: 0 1px 3px 0 rgba(23, 81, 153, 0.05);

  .layout-header-inner {
    display: flex;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    height: 56px;

    section {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      padding: 4px;

      button {
        padding: 12px;
      }
    }

    .header-logo {
      padding-left: 20px;
      font-weight: 500;
      font-size: 20px;
      letter-spacing: 1.2px;
      text-decoration: none;
      cursor: pointer;

      &.router-link-active {
        color: #2c3e50;
        text-decoration: none;
      }
    }

    .header-right {
      display: flex;
      justify-content: flex-end;

      .module-list {
        display: flex;
        margin: 0;
        padding-left: 0;
        list-style-type: none;
        height: 100%;
        visibility: hidden;

        @media screen and (min-width: $screen-sm-min) {
          visibility: visible;
        }

        .module {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 18px;

          &.active {
            color: #0084ff;
          }

          span {
            cursor: pointer;

            &:hover {
              color: #0084ff;
            }
          }
        }
      }
    }
  }
}
  .mask {
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .7);
  }

  .popup-inner {
    position: fixed;
    z-index: 2;
    width: 300px;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
    background-color: #fff;
    transition: transform 0.3s;

    &.active {
      transform: translateX(0);
    }
  }

  /* search */
  .search {
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    z-index: 2;
    top: 0;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    background-color: #fff;

    button {
      padding: 12px;
    }

    input {
      flex-grow: 1;
      padding: 5px;
      border: none;
      border-bottom: 1px solid #000;
      outline: none;
      appearance: none;

      &::-webkit-search-cancel-button {
        display: none;
      }
    }
  }

  .profile {
    display: flex;
    align-items: center;
    padding: 16px 16px 8px 16px;

    .profile-avatar {
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }

    .profile-info {
      margin-left: 10px;

      .profile-name {
        font-size: 20px;
        line-height: 1.5;
        font-weight: 500;
      }

      .profile-desc {
        font-size: 16px;
        line-height: 1.5;
      }
    }
  }

  .more-list {
    list-style-type: none;
    padding-left: 0;

    li {

      .item-link {
        display: flex;
        align-items: center;
        padding-left: 16px;
        text-decoration: none;
        line-height: 40px;

        &.router-link-active {
          color: #2c3e50;
          text-decoration: none;
        }     
      }
    }

    .name {
      margin-left: 24px;
      font-size: 14px;
    }
  }
</style>