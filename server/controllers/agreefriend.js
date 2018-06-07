module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  var time=new Date().getTime()
  await mysql('friends').insert([{
    user1: ctx.request.query.id,
    user2: ctx.request.query.otherpersonid,
    date: time,
    type: 'friend'
  },
    {
      user2: ctx.request.query.id,
      user1: ctx.request.query.otherpersonid,
      date: time,
      type: 'friend'
    }]).then(res => {
    ctx.body = res
  })
}