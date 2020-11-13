const Router = require('koa-router')
const apiRouter = new Router({ prefix: '/api' })
const axios = require('axios')

// const deployAxios = (obj) => {
//   // const productionApiBaseURL = 'https://www.litmonw.com/api'
// }

const request = axios.create({
  baseURL: 'http://localhost:3000',
})

apiRouter.get('/*', async ctx => {
  const path = ctx.path.split('api')[1]
  const res = await request.get(`${path}`, {
    params: ctx.query
  })
  ctx.body = res.data
})

module.exports = apiRouter