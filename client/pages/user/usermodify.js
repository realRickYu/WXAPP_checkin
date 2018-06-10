var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    emailstart: false,
    username:'',
    gender: '',
    tel: '',
    email: '',
    hometown: '',
    signal: '',
  },
  onLoad: function () {
    var that = this
    //上传userID 换取用户资料
    qcloud.request({
      url: config.service.getuserinfoUrl,
      data: {
        id: getApp().globalData.userId,
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          username: res.data[0].username,
          gender: res.data[0].gender,
          tel: res.data[0].tel,
          email: res.data[0].email,
          hometown: res.data[0].hometown,
          signal: res.data[0].signal,
        })
      }
    })
  },
  emailInput(e) {
    let that = this
    let email = e.detail.value
    that.setData({
      email
    })
  },
  emailFocus: function (e) {
    var that = this
    that.setData({
      emailstart: true
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表单所有input的值
    //但用户名包含非法字符的问题还需要解决
    if (formData.username == '') {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    //修改用户资料
    qcloud.request({
      url: config.service.modifyuserUrl,
      data: {
        id: app.globalData.userId,
        username: formData.username,
        tel: formData.tel,
        signal: formData.signal,
        hometown: formData.hometown,
        gender: formData.gender,
        email: formData.email
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
})