// pages/personal/inbox.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var starttime = new Date().getTime();
    qcloud.request({
      url: config.service.inboxUrl,
      data: {
        id: getApp().globalData.userId,
        checktime: starttime
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data,
        })
      }
    })
  },
  agree: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var otherpersonid = that.data.list[index].ori_id;
    qcloud.request({
      url: config.service.agreefriendUrl,
      data: {
        id: getApp().globalData.userId,
        otherpersonid: otherpersonid
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.data.list.splice(index, 1);
        that.setData({
          list: that.data.list,
        })
      }
    })
  },
  disagree: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    that.data.list.splice(index, 1);
    that.setData({
      list: that.data.list,
    })
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