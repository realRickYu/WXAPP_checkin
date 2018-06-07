module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('dynamic')
  .select('ori_id','user_name')
  .from(mysql.raw('dynamic,user'))
    .where(mysql.raw('record_id=? and ori_id=open_id', [ctx.request.query.recordid]))
  .then(res => {
    ctx.body = res
  })
}