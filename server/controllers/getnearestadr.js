const { uploader } = require('../qcloud')
const formidable = require("formidable")

module.exports = async (ctx, next) => {
  // 通过 Koa 中间件进行登录态校验之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：
  var lat = ctx.request.query.latitude
  var lng = ctx.request.query.longitude

  const { mysql } = require('../qcloud')
  // await mysql('location').select('id','place_name')
  // .where('longitude','>',(lng+0.01))
  //   .andWhere('longitude', '<', (lng-0.01))
  //   .andWhere('latitude', '>', (lat+0.01))
  //   .andWhere('latitude', '<', (lat+0.01))
  //   .orderBy(mysql.raw('(abs(longitude -??)+abs(latitude -?))',[lng,lat]))
  //   .then(res=>{
  //     ctx.body = res
  //   })

  await mysql('location').select('id', 'place_name')
    .where(mysql.raw('abs(longitude -?)<0.01 and abs(latitude -?)<0.01', [lng, lat]))
    .orderBy(mysql.raw('(abs(longitude -?)+abs(latitude -?))', [lng, lat]))
    .limit(1)
    .then(res => {
      ctx.body = res
    })

}