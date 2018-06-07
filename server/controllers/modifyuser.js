module.exports = async (ctx, next) => {
  // 通过 Koa 中间件进行登录态校验之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：

  const { mysql } = require('../qcloud')

  await mysql('user').select('id').where({ open_id: ctx.request.query.id }).then(res => {
    if (res.length = 0) {
      ctx.body = -1
    } else {
      mysql('user').where('open_id', ctx.request.query.id)
      .update({
        user_name: ctx.request.query.username,
        gender: ctx.request.query.gender,
        phone: ctx.request.query.tel,
        mail: ctx.request.query.email,
        hometown: ctx.request.query.hometown,
        signature: ctx.request.query.signal,
      }).then(res => {
        ctx.body = 0
      })
    }
  })
}