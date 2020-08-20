<template>
  <footer>
    <ul
      class="more"
      @click="showMsg"
    >
      <li><span>关于</span></li>
      <li><span>建议反馈</span></li>
      <li><span>合作</span></li>
      <li><span>我在语雀</span></li>
      <li><span>联系</span></li>
    </ul>
    <ul class="beian">
      <li><span>蜀ICP备15003202号-2</span></li>
    </ul>
    <ul class="copyright">
      <li><span>&copy;2020 牧野长空</span></li>
      <li><span>Powered by Tencent Cloud</span></li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'MicroFooter',
  methods: {
    showMsg() {
      this.$swal('这里还没有准备好哦')
    },
  }
}
</script>

<style lang="scss" scoped>
footer {
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding-left: 0;
    list-style-type: none;

    li {
      font-size: 12px;
      color: #909090;
      line-height: 1.6;

      span {
        cursor: pointer;
      }

      &::after {
        content: '·';
        margin: 0 4px;
        color: #c6cfda;
      }
    }
  }
}
</style>