<template>
  <div class="card-container">
    <div class="card">
      <div class="card-info">
        <div class="card-info-inner">
          <div class="card-date">
            <span class="card-day">28</span>
            <span class="card-year-month"> Jul 2020</span>
          </div>
          <div class="card-title">
            19年下半年已定档的19部恐怖片，你一定不想错过测试测试测试测试测试...
          </div>
          <div class="card-section">
            来自文章/技术
          </div>
          <button class="action-btn">
            阅读全文
          </button>
        </div>
      </div>
      <div class="card-cover">
        <p class="card-float-date">
          28 Jul 2020
        </p>
        <img
          src="../assets/img/banner2.jpg"
          alt="banner img"
        >
        <div class="card-float-info">
          <p class="card-float-title">
            离玥传：零下记忆
          </p>
          <p class="card-float-description">
            沉浸式悬疑推理，生存下去揭露真相
          </p>
        </div>
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

.card-container {
  padding: 0 4vw;

  @media screen and (min-width: $screen-sm-min) {
    padding: 0 16px;
  }
}

.card {
  display: flex;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;

  @media screen and (min-width: $screen-sm-min) {
    border-radius: 12px;
  }

  .card-info {
    flex: 6;
    padding-top: 36px;
    overflow: hidden;

    @media screen and (max-width: $screen-md-min) {
      padding-top: 20px;
    }

    @media screen and (max-width: $screen-sm-min) {
      display: none;
    }

    .card-info-inner {
      padding-left: 32px;
    }


    .card-date {
      display: flex;
      flex-direction: column;
      font-weight: 500;

      .card-day {
        line-height: 56px;
        font-size: 56px;

        @media screen and (max-width: $screen-md-min) {
          font-size: 48px;
        }
      }

      .card-year-month {
        font-size: 15px;
      }
    }

    .card-title {
      font-weight: 500;
      margin-top: 20px;
      margin-bottom: 28px;
      padding-right: 32px;
      height: 82px;
      font-size: 36px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

        @media screen and (max-width: $screen-md-min) {
          margin-bottom: 24px;
          height: 72px;
          font-size: 32px;
        }
    }

    .card-section {
      font-size: 20px;

      @media screen and (max-width: $screen-md-min) {
        font-size: 16px;
      }
    }

    .action-btn {
      background-color: #0084ff;
      border: none;
      color: #fff;
      margin-top: 28px;
      padding: 9px 22px;
      font-size: 18px;
      border-radius: 40px;

      @media screen and (max-width: $screen-md-min) {
        margin-top: 24px;
        font-size: 15px;
      }
    }
  }

  .card-cover {
    flex: 4;
    flex-shrink: 0;
    position: relative;
    z-index: 0;
    padding-bottom: 40%;
    height: 0;

    @media screen and (max-width: $screen-sm-min) {
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
    }

    @media screen and (max-width: 480px) {
      padding-bottom: 100%;  
    }

    @media screen and (max-width: $screen-sm-min) {
      .card-float-date {
        position: absolute;
        z-index: 2;
        top: 16px;
        left: 16px;
        font-size: 13px;
        color: #fff;
      }
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      object-fit: cover;
    }

    @media screen and (max-width: $screen-sm-min) {
      .card-float-info {
        position: absolute;
        z-index: 2;
        width: 100%;
        bottom: 0;
        left: 0;
        padding: 0 16px 18px;
        color: #fff;

        .card-float-title {
          font-size: 16px;
          line-height: 28px;
        }

        .card-float-description {
          font-size: 13px;
          line-height: 20px;
        }
      } 
    }
  }
}
</style>