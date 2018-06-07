module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  var tmp=mysql('user').select('checktime').where({ open_id: ctx.request.query.id});

  // await mysql('dynamic').select('ori_id','type','record_id','date')
  //   .where({ 'des_id': ctx.request.query.id})
  //   .andWhere('date','>',tmp)
  //   .then(res=>{
  //     ctx.body=res
  //   })
  await mysql('user').select('ori_id','type','record_id','date','user_name')
  .from(mysql.raw('dynamic,user'))
    .where(mysql.raw('user.open_id=dynamic.ori_id'))
    .andWhere({ 'des_id': ctx.request.query.id })
    .andWhere('date', '>', tmp)
    .orderBy('date')
    .then(res => {
      ctx.body = res
    }) 

  await mysql('user').update({
    checktime: ctx.request.query.checktime
  }).where({open_id:ctx.request.query.id})

}