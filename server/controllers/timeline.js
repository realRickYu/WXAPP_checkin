module.exports = async (ctx, next) => {
  const { mysql } = require('../qcloud')
  await mysql('record')
    .select('record.id as rid', 'position', 'text', 'image', 'record.date',  'place_name', 'user_name','user.id as uid')
    .from(mysql.raw('record,location,user'))
    // .where(mysql.raw('position=location.id'))
    // .andWhere(function(){
    //   this.whereIn('user.id',function(){
    //     this.select('user2').from('friends').where({ 'user1': ctx.request.query.id})
    //   })
    //   .orWhereIn('user.id', [ctx.request.query.id])      
    // })
    // .andWhere('record.date', '<', ctx.request.query.starttime)
    .where(mysql.raw('record.date<?and (record.user_id =? or record.user_id in (select user2 from friends where user1= ?)) and position= location.id and user.open_id = record.user_id', [ctx.request.query.starttime, ctx.request.query.id,ctx.request.query.id])).orderBy('record.date', 'desc').then(res => {
      ctx.body = res
    })
}