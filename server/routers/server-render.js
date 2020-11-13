/* 服务端渲染 */
const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  // 用于服务端渲染时，传入 vue-server-renderer，
  // vue-server-renderer 取得 context， 渲染完成之后，会插入一系列属性，便于渲染 HTML。
  const context = { url: ctx.path }

  try {
    const appString = await renderer.renderToString(context)

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })

    ctx.body = html
  } catch (error) {
    console.log('render error', error)
    throw error
  }
}