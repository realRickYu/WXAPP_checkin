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
  await mysql('user').select('user_name','mail').where({open_id:123456}).then(res => {
    ctx.state.data=res
    //ctx.body ={phone:ctx.request.query.phone,user:ctx.request.query.user}
  })
  await mysql('user').where({ user_name: ctx.request.query.user }).update({phone: ctx.request.query.phone,
    thisKeyIsSkipped: undefined})
    //取到的数据
  //console.log(data2)
      // loginState 为 1，登录态校验成功
    // if (ctx.state.$wxInfo.loginState === 1) {
    //   // loginState 为 1，登录态校验成功
    //   // const { mysql } = '../qcloud'

      
    //   // const tmp = await mysql('cSessionInfo').select('open_id')
    //   //tx.state.data=tmp
    //   //ctx.state.data = '收到信息'
    // } else {
    //   ctx.state.code = -1
    // }
}