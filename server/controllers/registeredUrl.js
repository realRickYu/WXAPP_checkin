module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('user').select('id').where({ open_id: ctx.request.query.id }).then(res => {
    if (res.length > 0) {
      ctx.body = 'false'
    } else {
      ctx.body = 'true'
    }
  })
  
}