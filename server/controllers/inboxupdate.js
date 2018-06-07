module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  var tmp = mysql('user').select('checktime').where({ open_id: ctx.request.query.id });
  await mysql('dynamic').select('id')
    .andWhere({ 'des_id': ctx.request.query.id })
    .andWhere('date', '>', tmp)
    .then(res => {
      if(res.length>0){
        ctx.body = 'true'
      }else{
        ctx.body = 'false'
      }      
    }) 
}