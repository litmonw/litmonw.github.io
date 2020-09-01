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
  const productionApiBaseURL = 'https://www.litmonw.com/api'
  const devApiBaseURL = '/api'

  if (process.env.NODE_ENV === 'production') {
    obj.defaults.baseURL = productionApiBaseURL
  } else {
    obj.defaults.baseURL = devApiBaseURL
  }
  
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