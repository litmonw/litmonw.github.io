<template>
  <div class="card">
    <div class="card-header">
      <span class="card-category">{{ feed.category }}</span> / <span class="card-tag">{{ feed.tag }}</span>
      <span class="card-date">{{ getRelativeTime(feed.createTime) }}</span>
    </div>
    <div class="card-main">
      <div class="card-title">
        {{ feed.title }}
      </div>
      <div class="card-content">
        {{ sliceContent }}
        <span
          v-if="sliceContent.length > 300"
          class="card-content-tips"
        >
          阅读全文
        </span>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-view-count">
        <app-icon name="ri-eye-line" />
        {{ getReadCountText(feed.readCount) }} 阅读
      </div>
      <div class="card-like-count">
        <app-icon name="ri-thumb-up-line" />
        {{ feed.likeCount }} 点赞
      </div>
      <!-- <div class="card-comment-count">
        {{ feed.commentCount }} 评论
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedCard',
  props: {
    feed: {
      type: Object,
      default: () => {
        return {
          // ['category', 'tag', 'title', 'content', 'likeCount', 'commentCount']
        }
      }
    }
  },
  computed: {
    sliceContent() {
      const content = this.feed.content
      const resultContent = this.replaceContent(content)

      return resultContent.length > 300 ? `${resultContent.slice(0, 300)}...` : resultContent
    }
  },
  methods: {
    getRelativeTime(createTime) {
      const currentTime = this.$dayjs()
      const actualTime = this.$dayjs(createTime)
      const differenceHourValue = currentTime.diff(actualTime, 'h')
      const differenceMinuteValue = currentTime.diff(actualTime, 'm')
      const differenceSecondValue = currentTime.diff(actualTime, 's')

      if (differenceMinuteValue < 1) {
        return `${differenceSecondValue}秒前`
      }

      if (differenceHourValue < 1) {
        return `${differenceMinuteValue}分钟前`
      }

      if (differenceHourValue >=1 && differenceHourValue < 24) {
        return `${differenceHourValue}小时前`
      }

      const differenceDayValue = currentTime.diff(actualTime, 'd')
      if (differenceDayValue > 0 && differenceDayValue <= 7) {
        return `${differenceDayValue}天前`
      }

      return actualTime.format('YYYY-MM-DD hh:mm')
    },
    replaceContent(content) {
      // 去掉标题符号 # 包括所有文字。
      const replaceContent = content.replace(/(#+)[^#][^\n]*?(?:\n)/g, '')
      // 去掉引用符号 > 不去掉后面文字。
      const replaceContent1 = replaceContent.replace(/>[^\n]*?(?:\n)/g, (match) => {
        return match.slice(2)
      })
      // 去掉图片符号 ![...](...
      const replaceContent2 = replaceContent1.replace(/!\[[^\n]*\]\([^\n]*/g, '')

      // 去掉链接符号 [...](...
      const replaceContent3 = replaceContent2.replace(/\[[^\n]*\]\(([^\n]*)/g, (match, p1) => {
        return p1
      })

      return replaceContent3
    },
    getReadCountText(count) {
      return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  padding: 16px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  word-break: break-word;

  &:hover {
    background-color: rgba(0,0,0,.01);
  }

  &:before {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #e8eaed;
  }

  .card-header {
    font-size: 12px;
    color: #8590a6;
  }

  .card-main {
    margin-top: 8px;

    .card-title {
      font-size: 18px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover {
        text-decoration: underline;
      }
    }

    .card-content {
      margin-top: 6px;
      line-height: 1.5;
      font-size: 14px;

      .card-content-tips {
        color: $primary-color
      }
    }
  }

  .card-footer {
    display: flex;
    margin-left: -8px;
    margin-top: 6px;
    font-size: 13px;
    color: #8590a6;

    i {
      margin-right: 4px;
    }

    div {
      display: flex;
      margin-left: 8px;
      align-items: center;
    }
  }
}
</style>