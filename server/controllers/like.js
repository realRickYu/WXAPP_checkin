module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('dynamic').insert({
    ori_id: ctx.request.query.id,
    date: new Date().getTime(),
    type: 'like',
    record_id: ctx.request.query.textid,
    des_id:function(){
      this.select('user_id').from('record').where({
        id: ctx.request.query.textid
      })
    }
  }).then(res => {
    ctx.body = res
  })
}