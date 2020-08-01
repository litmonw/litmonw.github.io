<template>
  <div class="home-container">
    <div class="banner-wrap">
      <banner-card />
    </div>
    <footer>
      <span>@2020</span>
      <span>蜀ICP备13013524号</span>
    </footer>
  </div>
</template>

<script>
import BannerCard from '../components/BannerCard'

export default {
  name: 'PageHome',
  components: {
    BannerCard
  },
  data() {
    return {}
  },
  beforeRouteUpdate(to, from, next) {
    const page = to.query.page
    this.currentPage = page
    this.getList(page)
    next()
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  background: #00c6ff;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #0072ff, #00c6ff);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #0072ff, #00c6ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  // background-image: linear-gradient(#e66465, #9198e5);
  height: 100vh;
  overflow: hidden;

  .banner-wrap {
    max-width: 980px;
    margin: 0 auto;
    margin-top: 32px;
  }
}

footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 18px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: hsla(0,0%,100%, .6);
  border-top: 1px solid hsla(0,0%,100%, .1);

  span {
    margin-left: 20px;
  }
}
</style> 