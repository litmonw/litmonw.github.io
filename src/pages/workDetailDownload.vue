<template>
  <!-- 下载 -->
  <div class="work-download">
    <div class="work-download-section">
      <div class="icon">
        <app-icon
          name="ri-install-fill"
          size="48px"
        />
      </div>
      <h3>应用</h3>
      <p>开箱即用，无需等待</p>
      <a href="https://www.baidu.com">立即下载</a>
    </div>
    <div class="work-download-section">
      <div class="icon">
        <app-icon
          name="ri-github-fill"
          size="48px"
        />
      </div>
      <h3>源代码</h3>
      <p>应用相关源代码</p>
      <a href="">立即查看</a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.work-download {
  display: flex;
  flex-wrap: wrap;
  max-width: 980px;
  margin: 16px auto 0;
  padding: 35px 65px;
  border-radius: 3px;
  background-color: #fff;
  overflow: hidden;

  .work-download-section {
    position: relative;
    padding: 30px 0;
    width: 100%;
    text-align: center;

    @media screen and (max-width: $screen-sm-min) {
      &:not(:last-child):after {
        position: absolute;
        content: "";
        bottom: 0;
        transform: translateX(-50%);
        left: 50%;
        width: 100%;
        height: 1px;
        background-color: #eee;
      } 
    }

    @media screen and (min-width: $screen-sm-min) {
      width: 50%;

      &:not(:last-child):after {
        position: absolute;
        content: "";
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 200px;
        background-color: #eee;
        right: 0;
      }
    }

    .icon {
      display: inline-block;
      width: 80px;
      height: 80px;
      line-height: 80px;
      background: #383d421a;
      border-radius: 50%;
    }

    h3 {
      margin-top: 24px;
      margin-bottom: 10px;
      font-size: 20px;
    }

    p {
      font-size: 14px;
      color: #515a6e;
    }

    a {
      display: inline-block;
      margin-top: 40px;
      padding: 11px 32px;
      line-height: 24px;
      font-size: 16px;
      border-radius: 24px;
      background-color: $primary-color;
      text-decoration: none;
      color: #fff;
    }
  }
}
</style>