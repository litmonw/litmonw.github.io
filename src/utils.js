const cloneDeepByLodash = require('lodash/cloneDeep')

const getScrollTop = () => {
  var scroll_top = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scroll_top = document.documentElement.scrollTop
  } else if (document.body) {
    scroll_top = document.body.scrollTop
  }
  return scroll_top
}

const getClientHeight = () => {
  return window.innerHeight
}

const deployAxios = (obj) => {
  obj.defaults.baseURL = '/api'
  return obj
}

const cloneDeep = (obj) => {
  return cloneDeepByLodash(obj)
}

module.exports = {
  getScrollTop,
  getClientHeight,
  deployAxios,
  cloneDeep
}