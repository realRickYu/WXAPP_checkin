module.exports = async (ctx, next) => {
  // 通过 Koa 中间件进行登录态校验之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：

  //   const DB = require('knex')({
  //     client: 'mysql',
  //     connection: {
  //       host: 'localhost',
  //       port: 3306,
  //       user: 'root',
  //       password: 'ly984288242',
  //       database: 'si',
  //     }
  //   });
  //   DB('user').select('openid').then(res => {
  //   ctx.state.data = res
  // })


  // let ctx_query = ctx.query; //query返回格式化的对象
  // let ctx_querystring = ctx.querystring; //querystring返回原字符
  // // 从上下文的request对象中获取
  // let request = ctx.request;
  // let req_query = request.query; //query返回格式化好的对象
  // let req_querystring = request.querystring; //querystring返回原字符串。


  const { mysql } = require('../qcloud')
  await mysql('user').insert({
    open_id: ctx.request.query.id,
    user_name: ctx.request.query.username, 
    gender: ctx.request.query.gender,
    phone: ctx.request.query.tel, 
    mail: ctx.request.query.email, 
    hometown: ctx.request.query.hometown,
    signature: ctx.request.query.signal,
  }).then(res => {
  ctx.state.data = res
})
}