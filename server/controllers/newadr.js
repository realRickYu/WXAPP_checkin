const { uploader } = require('../qcloud')
const formidable = require("formidable")

module.exports = async (ctx, next) => {
  // 通过 Koa 中间件进行登录态校验之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：

  const { mysql } = require('../qcloud')
  await mysql('location').insert({
        longitude: ctx.request.query.longitude,
        latitude: ctx.request.query.latitude,
        place_name: ctx.request.query.adrname,
      })
  await mysql('location').max('id').then(res => {
    ctx.body=res
  })
}