var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    email:'',
    emailstart:false,
  },
  emailInput(e) {
    let that = this
    let email = e.detail.value
    that.setData({
      email
    })
  },
  emailFocus: function (e) {
    var that=this
    that.setData({
      emailstart: true
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表单所有input的值
    console.log(formData)
    console.log(getApp().globalData.userId)
    //但用户名包含非法字符的问题还需要解决
    if (formData.username == '')
    {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    //上传新用户资料
    qcloud.request({
      url: config.service.adduserUrl,
      data: {
        id: getApp().globalData.userId,
        username:formData.username,
        tel: formData.tel,
        signal: formData.signal,
        hometown: formData.hometown,
        gender: formData.gender,
        email: formData.email
      },
      login:true,
      header: { 'Content-Type': 'application/json' },
    })
    wx.switchTab({
      url: "../publish/publish"})
  },
})