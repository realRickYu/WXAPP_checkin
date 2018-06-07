module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('dynamic').insert({
    ori_id: ctx.request.query.id,
    des_id: ctx.request.query.otherpersonid,
    date: new Date().getTime(),
    type:'friend'
  }).then(res => {
    ctx.body = res
  })
}