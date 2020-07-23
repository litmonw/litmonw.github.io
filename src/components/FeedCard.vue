<template>
  <div class="card">
    <div class="card-header">
      <span class="card-category">{{ feed.category }}</span>/
      <span class="card-tag">{{ feed.tag }}</span>
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
      <div class="card-like-count">
        {{ feed.likeCount }} 点赞
      </div>
      <div class="card-comment-count">
        {{ feed.commentCount }} 评论
      </div>
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
          // category: '前端',
          // tag: '学习',
          // title: '如何评价程序员社区网站思否（Segmentfault）和掘金',
          // content: '然后我也会经常的逛一逛SF，在上面找一些感兴趣的问题回答一下。然后在17年五六月份时，在上面写了几篇比较水的文章，每篇几千阅读量，也还行。',
          // likeCount: 153,
          // commentCount: 12
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
  word-break: break-all;

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
    font-size: 14px;
  }

  .card-main {
    margin-top: 8px;

    .card-title {
      font-size: 18px;
      font-weight: 700;

      &:hover {
        text-decoration: underline;
      }
    }

    .card-content {
      margin-top: 6px;
      line-height: 1.5;
      font-size: 14px;

      .card-content-tips {
        color: #0084ff
      }
    }
  }

  .card-footer {
    display: flex;
    margin-left: -8px;
    margin-top: 6px;
    font-size: 13px;
    color: #8590a6;

    div {
      margin-left: 8px;
    }
  }
}
</style>