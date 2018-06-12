const { uploader } = require('../qcloud')
const formidable = require("formidable")

module.exports = async (ctx, next) => {
  var lat = ctx.request.query.latitude
  var lng = ctx.request.query.longitude

  function distanceByLnglat(lng1, lat1, lng2, lat2) {
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0;// 取WGS84标准参考椭球中的地球长半径(单位:m)
    s = Math.round(s * 10000) / 10000;
    alert(s);
    // //下面为两点间空间距离（非球面体）
    // var value= Math.pow(Math.pow(lng1-lng2,2)+Math.pow(lat1-lat2,2),1/2);
    // alert(value);
  }

  function Rad(d) {
    return d * Math.PI / 180.0;
  }

  const { mysql } = require('../qcloud')
  // await mysql('location').select(mysql.raw('id,place_name,6371*sqrt(pow(abs(longitude -?)*3.14/180,2)+pow(abs(latitude -?)*3.14/180,2)) as dis', [lng, lat]))
  await mysql('location').select(mysql.raw('id,place_name,6371*2 * asin(sqrt(pow(sin((latitude-?)*3.14/360), 2) + cos(latitude*3.14/180) * cos(?*3.14/180) * pow(sin((longitude-?)*3.14 / 360), 2))) as dis', [lat,lat,lng]))
    .where(mysql.raw('abs(longitude -?)<0.1 and abs(latitude -?)<0.1', [lng, lat]))
    // .orderBy(mysql.raw('(abs(longitude -?)+abs(latitude -?))', [lng, lat]))
    .orderBy(mysql.raw('dis'))
    .limit(20)
    .then(res => {
      ctx.body = res
    })

}