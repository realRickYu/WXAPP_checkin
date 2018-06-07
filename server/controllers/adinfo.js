module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('location')
    .select('id','longitude','latitude','place_name')
    .where({id: ctx.request.query.adrid })
    .then(res => {
      ctx.body = res
    })
}