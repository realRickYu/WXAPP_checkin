// pages/user/registered.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGotUserInfo: function (e) {
    //查看此openID是否注册过，若注册过，则跳至时间线界面，若没有，则跳至注册界面
    qcloud.request({
      url: config.service.registeredUrl,
      data: {
        id: getApp().globalData.userId
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      //返回userID或者未注册过的标识
      success: function (res) {
        console.log(res)
        console.log('success')
        var register = res.data;//根据openID判断是否注册过，false和true
        if (register) {
          wx.navigateTo({ url: "useradd" })
        } else {
          wx.switchTab({ url: "../timeline/timeline" })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})