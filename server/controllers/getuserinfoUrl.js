module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('user').select('user_name','gender','phone','mail','hometown','signature').where({ open_id: ctx.request.query.id }).then(res => {
      ctx.body = res
  })

}