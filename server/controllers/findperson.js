const { uploader } = require('../qcloud')
const formidable = require("formidable")

module.exports = async (ctx, next) => {
  var name = ctx.request.query.value
  name1 = '%' + name + '%'
  const { mysql } = require('../qcloud')
  await mysql('user').select(mysql.raw('user_name,open_id'))
    .where(mysql.raw("user_name like ?", [name1]))
    .orWhere(mysql.raw("hometown like ?", [name1]))
    .orWhere(mysql.raw("phone = ?", [name]))
    .orWhere(mysql.raw("mail =  ?", [name]))
    .then(res => {
      ctx.body = res
    })
}