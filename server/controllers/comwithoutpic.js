const { uploader } = require('../qcloud')
const formidable = require("formidable")

module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('record').insert({
        user_id: ctx.request.query.id,
        text: ctx.request.query.text,
        date: ctx.request.query.sendtime,
        position: ctx.request.query.adrid,
        publicpublish: ctx.request.query.publicpublish
      }).then(res => {
        ctx.body = res
      })
}