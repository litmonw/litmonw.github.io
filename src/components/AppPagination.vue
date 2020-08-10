<template>
  <ul class="pagination">
    <li
      :class="{'disabled': currentPage === 1}"
      class="special"
      @click="switchPage(currentPage - 1)"
    >
      上一页
    </li>
    <li
      v-show="currentPage >= 3 && pageCount > 3"
      @click="switchPage(1)"
    >
      1
    </li>
    <li
      v-show="currentPage > 3 && pageCount > 4"
      class="disabled"
    >
      ...
    </li>
    <li
      v-for="item in pageList"
      :key="item.id"
      :class="{'active': currentPage === item}"
      @click="switchPage(item)"
    >
      {{ item }}
    </li>
    <li
      v-show="currentPage < pageCount - 2 && pageCount > 4"
      class="disabled"
      @click="switchPage(pageCount)"
    >
      ...
    </li>
    <li
      v-show="currentPage <= pageCount - 2 && pageCount > 3"
      @click="switchPage(pageCount)"
    >
      {{ pageCount }}
    </li>
    <li
      :class="{'disabled': currentPage === pageCount || pageCount === 0}"
      class="special"
      @click="switchPage(currentPage + 1)"
    >
      下一页
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    value: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1,
      pageCount: 0
    }
  },
  computed: {
    pageList() {
      const currentPage = this.currentPage
      const pageCount = this.pageCount
      let prepareList = []
      let minPage = currentPage - 1 > 1 ? currentPage - 1 : 1
      let maxPage = currentPage + 1 > pageCount ? pageCount : currentPage + 1

      if (currentPage === 1 && pageCount > 2) {
        maxPage += 1
      }

      if (currentPage === pageCount && pageCount > 2) {
        minPage -= 1
      }

      for (let index = minPage; index <= maxPage; index++) {
        prepareList.push(index)
      }

      return prepareList.length ? prepareList : [1]
    }
  },
  watch: {
    value(val) {
      this.currentPage = val
    },
    total() {
      const { total, pageSize} = this
      this.pageCount = Math.ceil(total / pageSize)
    }
  },
  mounted() {
    const { total, pageSize} = this
    if (!total || !pageSize) {
      return false
    }
    
    this.pageCount = Math.ceil(total / pageSize)
  },
  methods: {
    switchPage(page) {
      if (this.currentPage === page || page > this.pageCount || page < 1) {
        return false
      }

      this.currentPage = page

      this.$emit('change-page', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  margin: 0;
  padding-left: 0;
  font-size: 14px;
  list-style-type: none;

  li {
    min-width: 32px;
    height: 32px;
    line-height: 30px;
    color: #666;
    background-color: #fff;
    text-align: center;
    cursor: pointer;

    @media screen and (min-width: $screen-sm-min) {
      margin-right: 10px;
      border: 1px solid #dcdee2;
      border-radius: 4px;

      &:hover:not(.disabled) {
        border-color: $primary-color;
        color: $primary-color;
      }
    }

    &.active {
      border-color: $primary-color;
      color: $primary-color;
    }

    &.disabled {
      opacity: .7;
      cursor: not-allowed;
    }

    &.special {
      padding: 0 8px;
    }
  }
}
</style>