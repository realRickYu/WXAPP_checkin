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
    adrname:'二餐',
    mayor: [{userid:'1234',username:'大王',times:'5'}],
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
      url: config.service.adrinfoUrl,
      data: {
        adrid: options.adrid,
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          adrname: res.data.adrname,
          mayor: res.data.mayor,
          friend: res.data.friend
        })
      }
    })
  },
  plase_homepage:function(){
    wx.reLaunch({
      url: 'placehomepage?adrid=' + adrid
    })
  },
  homepage: function () {
    wx.switchTab({
      url: '../timeline/timeline',
    })
  },
})