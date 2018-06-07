const { uploader } = require('../qcloud')
const formidable = require("formidable")

module.exports = async ctx => {
  var tmp
  var form = new formidable.IncomingForm();
  form.parse(ctx.req, async function (err, fields, files) {
    if (err) { throw err; return; }
    console.log(fields);//{ name: base64字符串 }
    // ctx.body = fields
    tmp = fields
  });

  const data = await uploader(ctx.req)
  //ctx.body = "end"

  // await mysql('record').insert({
  //   user_id: tmp.user_id, 
  //   text: tmp.text,
  //   date: tmp.date, 
  //   prefer: tmp.prefer, 
  //   image: data.imgUrl
  // })
  const { mysql } = require('../qcloud')
  await mysql('record').insert({
    user_id: tmp.id,
    text: tmp.text,
    date: tmp.sendtime,
    position: tmp.adrid,
    image:data.imgUrl,
    publicpublish:tmp.publicpublish
  })
  .then(res => {
    ctx.body = res
  })
}