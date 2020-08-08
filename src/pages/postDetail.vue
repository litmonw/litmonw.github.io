<template>
  <div class="about-container">
    <div class="about-container-inner">
      <app-breadcrumb>
        <app-breadcrumb-item to="/">
          首页
        </app-breadcrumb-item>
        <app-breadcrumb-item to="/post">
          文章
        </app-breadcrumb-item>
        <app-breadcrumb-item>详情</app-breadcrumb-item>
      </app-breadcrumb>
      <div class="article">
        <div class="article-body">
          <h1 class="article-title">
            {{ article.title }}
          </h1>
          <div
            ref="articleContent"
            class="article-content markdown-body"
          />
        </div>
        <div
          class="article-aside"
        >
          <div
            class="article-aside-inner"
            :class="{ 'fixed': overflowHeader }"
          >
            <ul
              class="catalog-list"
            >
              <tree-item
                v-for="item in navList"
                :key="item.id"
                :item="item"
                @jump-to-anchor="jumpToAnchor"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/github.css'
import '../../node_modules/github-markdown-css/github-markdown.css'

import treeItem from '../components/treeItem'

export default {
  name: 'PostDetail',
  components: {
    treeItem
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      navList: [],
      docsFirstLevels: [],
      docsSecondLevels: [],
      article: {},
      scrollTop: 0,
      toc: []
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
  },
  computed: {
    overflowHeader() {
      if (this.scrollTop > 89) {
        return true
      }
      return false
    }
  },
  async mounted() {
    window.addEventListener('scroll',this.handleScroll)

    const res = await this.getPostDetail()
    const data = res.data.data
    this.article = {
      title: data.title,
      content: data.content
    }

    // 解决图片加载会影响高度问题
    this.getDocsFirstLevels(0)

    // marked.js config
    const options = { headerIds: false }

    this.$refs.articleContent.innerHTML = this.$marked(this.article.content, options)

    /* 侧边栏 anchor */
    this.navList = this.handleNavTree()
    
    this.addTocNodeAnchor({children: this.navList, path: []})

    // 正文 id
    this.addheadingNodeId()
  },
  methods: {
    addTocNodeAnchor(node) {
      if (node.children && node.children.length > 0) {
        node.children.forEach((item, index) => {
          item.path = node.path.concat([index])
          this.addTocNodeAnchor(item)
        })
      }
    },
    jumpToAnchor(target) {
      const headingNodeList = document.querySelectorAll('h2, h3, h4')
      for (let index = 0; index < headingNodeList.length; index++) {
        const node = headingNodeList[index]
        if (node.getAttribute('data-id') === `item-${target}`) {
          const y = node.getBoundingClientRect().top + document.documentElement.scrollTop - 65
          window.scrollTo(0, y)
          break
        }
      }

      this.clearOtherTocActiveNode({children: this.navList}, target)
    },
    clearOtherTocActiveNode(node, target) {
      if (node.children && node.children.length > 0) {
        node.children.forEach(item => {
          if (item.path.join('-') !== target) {
            item.active = false
            this.clearOtherTocActiveNode(item)
          }
        })
      }
    },
    addheadingNodeId() {
      const headingNodeList = document.querySelectorAll('h2, h3, h4')
      headingNodeList.forEach((item, index) => {
        const result = this.getNodePath(this.navList, index + 1)
        if (result.length > 0) {
          item.setAttribute('data-id', `item-${result.join('-')}`)
        }
      })
    },
    getNodePath(navList, id) {
      for (let index = 0; index < navList.length; index++) {
        const node = navList[index]
        const t = this.getPath(node, id, index)
        if (t !== -1) {
          return t
        }
      }
    },
    getPath(node, id, lastIndex) {
      if (node.id !== id) {
        if (node.children && node.children.length) {
          for (let index = 0; index < node.children.length; index++) {
            const element = node.children[index]
            const t = this.getPath(element, id, index)
            // console.log(t)
            if (t !== -1) {
              return [lastIndex].concat(t)
            }
          }
        }

        return -1
      }

      return [lastIndex]
    },
    parse(markdown) {
      var current_h2 = null
      const tokens = this.$marked.lexer(markdown)
      for(const token in tokens) {
        if(token.type == 'heading') {
          const to_param = token.text.parameterize()
          if(token.depth == 2) {
            current_h2 = to_param
          } else if (token.depth == 3) {
            token.id = `${current_h2}/${to_param}`
          }
        }
      }
      return this.$marked.parser(tokens)
    },
    filterHeadings(renderer) {
      const tocSlugger = new this.$marked.Slugger()
      const heading = renderer.heading.bind(renderer)

      renderer.heading = (text, level, raw, slugger) => {
        this.toc.push({
          level: level,
          text: text,
          slug: tocSlugger.slug(text)
        })
        return heading(text, level, raw, slugger)
      }

      return renderer
    },
    handleScroll() {
      this.scrollTop = this.$utils.getScrollTop()
    },
    getPostDetail() {
      return this.$http.get('/post/detail', {
        params: {
          id: this.id
        }
      })
    },
    handleNavTree() {
      // 获得节点
      let navs = this.getTitle(this.article.content)
      navs.forEach((item, index) => {
        item.parentId = this.getParentIndex(navs, index) || null
      })

      return this.convertArray2Tree(navs, null)
    },
    //需要插入父节点 id，pid 为 null 或 ''，就是找 root 节点，然后 root 节点再去找自己的子节点
    convertArray2Tree(data, pid) {
      let res = []
      data.forEach(item => {
        if(item.parentId === pid){
          let itemChildren = this.convertArray2Tree(data, item.id)
          if(itemChildren.length) {
            item.children = itemChildren
          }
          res.push(item)
        }
      })
      return res
    },
    getTitle(content) {
      let nav = []

      let tempArr = []
      // console.log(content)
      // content.replace(/(#+)[^#][^\n]*?/g, function(match, m1, m2) {
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function(match, p1) {
        let title = match.replace('\n', '')
        let level = p1.length
        // console.log(title.replace(/^#+/, ''))
        // console.log(title.replace(/^#+/, '').replace(/\s/, ''))
        title = title.replace(/^#+/, '').replace(/\s/, '')
        if (!title) {
          return false
        }

        tempArr.push({
          title,
          level: level,
          active: tempArr.length > 0 ? false : true
        })
      })

      // console.log(tempArr)

      // 只处理最高四级标题，以及添加与 id 对应的 index 值
      nav = tempArr.filter(item => item.level <= 4)
      let index = 1
      return nav.map(item => {
        item.id = index++
        return item
      })
    },
    getDocsFirstLevels(times) {
    // 解决图片加载会影响高度问题
      setTimeout(() => {
        let firstLevels = []
        Array.from(document.querySelectorAll('h1'), element => {
          firstLevels.push(element.offsetTop - 60)
        })
        this.docsFirstLevels = firstLevels

        if (times < 8) {
          this.getDocsFirstLevels(times + 1)
        }
      }, 500)
    },
    getParentIndex(nav, endIndex) {
      // console.log(endIndex)
      // 根据目录-子目录排列规律，从当前子目录所处位置往前循环，找出它的父目录
      for (var i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].level > nav[i].level) {
          return nav[i].id
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-left: 16px;
}

.about-container {
  background-color: #f5f5f5;
  min-height: calc(100vh - 125px);
}

.about-container-inner {
  margin: 0 auto;
  padding-top: 16px;
  max-width: 960px;
}

.breadcrumb {
  margin-bottom: 16px;
}

.article {
  display: flex;
  overflow: hidden;
  position: relative;
  max-width: 960px;

  .article-body {
    width: 704px;
    background-color: #fff;
    padding: 0 24px 16px;

    @media screen and(max-width: 960px) {
      width: 100%;
    }

    .article-title {
        margin: 20px 0;
        font-size: 30px;
    }

    .article-content {
      min-height: 400px;
    }
  }

  .article-aside {
    margin-left: 16px;
    position: absolute;
    right: 0;
    top: 0;
    width: 240px;

    .article-aside-inner {
      background-color: #fff;
      width: inherit;
      overflow: hidden;
      display: none;

      @media screen and(min-width: 960px) {
        display: block;
      }

      &.fixed {
        position: fixed;
        top: 73px;
        bottom: 16px;
        overflow-y: auto;
      }
    }

    .catalog-list {
      list-style-type: none;
      padding-left: 16px;
    }
  }
}
</style>