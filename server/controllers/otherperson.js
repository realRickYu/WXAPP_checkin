module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('record')
    .select('record.id', 'position', 'text', 'image', 'record.date', 'publicpublish', 'place_name')
    .from(mysql.raw('record,location'))
    .where(mysql.raw('position=location.id'))
    .andWhere({'record.user_id': ctx.request.query.otherpersonid})
    .andWhere('record.date', '<', ctx.request.query.starttime)
    .orderBy('record.date', 'desc')
    .limit(10)
    .then(res => {
      ctx.body = res
    })
}