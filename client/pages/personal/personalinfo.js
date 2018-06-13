var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    emailstart: false,
    username: '',
    gender: '',
    tel: '',
    email: '',
    hometown: '',
    signal: '',
  },
  onLoad: function (options) {
    var that = this
    //上传userID 换取用户资料
    qcloud.request({
      url: config.service.getuserinfoUrl,
      data: {
        id: options.id,
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
        that.setData({
          username: res.data[0].user_name,
          gender: res.data[0].gender,
          tel: res.data[0].phone,
          email: res.data[0].mail,
          hometown: res.data[0].hometown,
          signal: res.data[0].signature,
        })
      }
    })
  },
})