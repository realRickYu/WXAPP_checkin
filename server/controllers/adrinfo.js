module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  var time = new Date().getTime() - 2592000000
  await mysql('record')
    .select(mysql.raw('user_id,count(*) as cid'))
    .where({ position: ctx.request.query.adrid})
    .andWhere('date','>',time )
    .groupBy('user_id')
    .orderBy('cid', 'desc').then(res => {
      ctx.body = res
    })
}