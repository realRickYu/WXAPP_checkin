module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('friends').select('id').where({
    user1: ctx.request.query.id,
    user2: ctx.request.query.otherpersonid,
  }).orWhere({
    user2: ctx.request.query.id,
    user1: ctx.request.query.otherpersonid,
  }).then(res => {
    if (res.length>0){
      ctx.body = 'true'
    }else{
      ctx.body = 'false'
    }    
  })
}