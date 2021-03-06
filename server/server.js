const Koa = require('koa')

const pageRouter = require('./routers/dev-ssr')
const send = require('koa-send')
const path = require('path')

const apiRouter = require('./routers/api')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    send(ctx, '/favicon.ico', { root: path.join(__dirname, '../src/assets/img')})
  } else {
    await next()
  }
})

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})