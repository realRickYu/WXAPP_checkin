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
    wx.request({
      url: config.service.getuserinfoUrl,
      data: {
        id: app.globalData.userId
      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          username: res.data.result.username,
          gender: res.data.result.gender,
          tel: res.data.result.tel,
          email: res.data.result.email,
          hometown: res.data.result.hometown,
          signal: res.data.result.signal,
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
    wx.request({
      url: config.service.modifyuserUrl,
      data: {
        id: app.globalData.userId,
        formData
      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
})