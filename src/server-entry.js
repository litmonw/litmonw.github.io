import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 服务端需要主动添加路由记录，才能匹配到需要调用的组件
    router.push(context.url)

    // 服务端渲染时使用，异步组件操作后才进行回调，如 api 数据
    router.onReady(() => {
      // 服务端渲染时使用，在路由准备好之后，异步操作请求
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            router: router.currentRoute,
          })
        }
      })).then(data => {
        console.log(data)
      })

      context.meta = app.$meta()

      resolve(app)
    })
  })
}