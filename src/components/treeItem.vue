<template>
  <li
    :class="liClassName"
  >
    <a
      :href="`#item-${item.path.join('-')}`"
      :style="nameStyles"
      :class="{'active': item.active}"
      @click.prevent="jumpToAnchor(item)"
    >
      {{ item.title }}
    </a>
    <ul
      v-if="isFolder"
      class="sub-list"
    >
      <tree-item
        v-for="(child, index) in item.children"
        :key="index"
        :level="level + 1"
        class="item"
        :item="child"
        @jump-to-anchor="$emit('jump-to-anchor', $event)"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    level: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length
    },
    liClassName() {
      return {
        [`l${this.level + 1}`]: true
      }
    },
    nameStyles() {
      return {
        'padding-left': this.level * 15 + 21 + 'px'
      }
    }
  },
  methods: {
    jumpToAnchor(item) {
      this.$emit('jump-to-anchor', `${item.path.join('-')}`)
      item.active = true
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding-left: 0;

  li {
      a {
        text-decoration: none;
        color: #2c3e50;
        display: block;
        padding: 4px 0 4px 21px;
        position: relative;
        cursor: pointer;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

      &:hover {
        background-color: #ebedef;
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -2px;
        width: 4px;
        height: 4px;
        background-color: currentColor;
        border-radius: 50%;
      }

      &.active {
        background-color: #ebedef;
        color: $primary-color;
      }
    }

    &.l1 > a {
      font-weight: 600;
      margin-bottom: 6px;

      &::after {
        left: 5px;
        margin-top: -3px;
        width: 6px;
        height: 6px;
      }
    }

    &.l2 > a::after {
      left: 24px;
    }

    &.l3 > a::after {
      left: 39px;
    }

    &.l4 > a::after {
      left: 54px;
    }
  }
}
</style>