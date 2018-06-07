const { uploader } = require('../qcloud')
const formidable = require("formidable")

module.exports = async (ctx, next) => {
  var name = ctx.request.query.adrname
  name='%'+name+'%'
  const { mysql } = require('../qcloud')
  await mysql('location').select(mysql.raw('id,place_name'))
    .where(mysql.raw("place_name like ?", [name]))
    .limit(20)
    .then(res => {
      ctx.body = res
    })

}