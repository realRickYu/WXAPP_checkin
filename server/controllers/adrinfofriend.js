module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  var time = new Date().getTime() - 2592000000
  await mysql('record')
    .select(mysql.raw('user_id,count(*) as cid'))
    .where({ position: ctx.request.query.adrid })
    .andWhere('user_id', 'in', function(){
      this.select('user2').from('friends').where({ 'user1': ctx.request.query.id})
    })
    .groupBy('user_id')
    .limit(5)
    .orderBy('cid', 'desc').then(res => {
      ctx.body = res
    })
}