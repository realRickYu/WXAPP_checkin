const { uploader } = require('../qcloud')
const formidable = require("formidable")

module.exports = async ctx => {
    // 获取上传之后的结果
    // 具体可以查看：

    
    var tmp
    var form = new formidable.IncomingForm();
    form.parse(ctx.req, async function (err, fields, files) {
      if (err) { throw err; return; }
      console.log(fields);//{ name: base64字符串 }
      ctx.body=fields
      tmp=fields
    });

    const data = await uploader(ctx.req)
    //ctx.body = "end"

    const { mysql } = require('../qcloud')
    await mysql('record').insert([{user_id:tmp.user_id,text:tmp.text,
      date: tmp.date, prefer: tmp.prefer, image: data.imgUrl
    }, {
      user_id: '123458', text: '不说天气了',
      date: tmp.date, prefer: '李', image: data.imgUrl
    }])

    //ctx.state.data = data
}


