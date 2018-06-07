module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('record')
  .select('record.id','user_id','text','image','record.date','publicpublish','user_name')
  .from(mysql.raw('record,user'))
  .where(mysql.raw('record.user_id=user.open_id'))
  // .andWhere({'dynamic.record_id':'record.id'})
  .andWhere({ 'position': ctx.request.query.adrid })
    .andWhere('record.date', '<', ctx.request.query.starttime)
    .orderBy('record.date','desc')
    .limit(10)
  .then(res=>{
    ctx.body=res
  })
}