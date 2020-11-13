const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.server.conf')

const serverCompiler = webpack(serverConfig)

// 在内存中读取文件，效率更高
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

/* webpack 打包 */
let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(err => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会儿，别着急...'
    return
  }

  /* 拿到 clientManifest */
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  // 渲染完整 HTML 的模板
  const template = fs.readFileSync(
    path.join(
      __dirname,
      '../server.template.ejs'
    )
    , 'utf-8')

  // 生成一个调用 render 的 Function
  const renderer = VueServerRenderer.createBundleRenderer(
    bundle,
    {
      /*
       * 这里将 inject 设置为 false，不让它注入
       */
      inject: false,
      clientManifest,
    }
  )

  await serverRender(ctx, renderer, template)
}

const router = new Router()
// router.get('.', handleSSR)
router.get('*', handleSSR)

module.exports = router