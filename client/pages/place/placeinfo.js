var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()
// pages/place/placeinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adrid:'',
    adrname:'',
    mayor:[],
    friends: [{ userid: '1234', username: '大王' }, { userid: '12345', username: '小王' },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      adrid: options.adrid,
    })
    qcloud.request({
      url: config.service.adinfoUrl,
      data: {
        adrid: options.adrid,
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          adrname: res.data[0].place_name ,
        })
      }
    })
    qcloud.request({
      url: config.service.adrinfoUrl,
      data: {
        adrid: options.adrid,
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          mayor: res.data
        })
      }
    })
    qcloud.request({
      url: config.service.adrinfofriendUrl,
      data: {
        adrid: options.adrid,
        id: getApp().globalData.userId
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          friends: res.data
        })
      }
    })
  },
  plase_homepage:function(){
    wx.reLaunch({
      url: 'placehomepage?adrid=' + this.data.adrid
    })
  },
  homepage: function () {
    wx.switchTab({
      url: '../timeline/timeline',
    })
  },
})