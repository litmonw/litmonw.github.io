<template>
  <div class="card">
    <div class="card-inner">
      <p class="card-origin">
        作者推荐
      </p>
      <img
        class="card-image"
        src="../assets/img/banner2.jpg"
        alt="banner"
      >
      <div class="card-info">
        <p class="card-title">
          离玥传：零下记忆
        </p>
        <p class="card-description">
          沉浸式悬疑推理，生存下去揭露真相
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerCard',
}
</script>

<style lang="scss" scoped>
.card {
  padding-left: 16px;
  padding-right: 16px;
  
  @media screen and (min-width: $screen-sm-min) {
    padding-left: 0;
    padding-right: 0;
  }

  width: 100%;
}

.card-inner {
  position: relative;
  z-index: 0;
  height: 0;
  padding-bottom: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0,0,0,.05);
  cursor: pointer;


  @media screen and (min-width: $screen-sm-min) {
    padding-bottom: 400px;
  }
  
  margin: 0;

  &:before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 48px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .7) 10%, rgba(0, 0, 0, 0));
  }

  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 68px;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 70%) 10%, rgba(0, 0, 0, 0%));
  }

  .card-origin {
    position: absolute;
    z-index: 2;
    top: 16px;
    left: 16px;
    font-size: 13px;
    color: #fff;
  }

  .card-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .card-info {
    position: absolute;
    z-index: 2;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0 16px 18px;
    color: #fff;

    .card-title {
      font-size: 16px;
      line-height: 28px;
    }

    .card-description {
      font-size: 13px;
      line-height: 20px;
    }
  }
}
</style>