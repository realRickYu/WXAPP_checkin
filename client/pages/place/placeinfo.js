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
    friends: []
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
        console.log(res)
        that.setData({
          mayor: res.data
        })
        qcloud.request({
          url: config.service.getuserinfoUrl,
          data: {
            id: res.data[0].user_id
          },
          login: true,
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            console.log(res)
            that.data.mayor[0].user_name = res.data[0].user_name
            that.setData({
              mayor: that.data.mayor
            })
          }
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
        console.log(res)
        for (var i = 0; i < res.data.length; i++)
        {
          var newarray = [{
            user_id: res.data[i].user_id,
          }];
          that.data.friends = that.data.friends.concat(newarray)
        }
        // that.setData({
        //   friends: res.data
        // })
        if (res.data.length>0)
        {
          var tempid = res.data[0].user_id;
          qcloud.request({
            url: config.service.getuserinfoUrl,
            data: {
              id: tempid
            },
            login: true,
            header: { 'Content-Type': 'application/json' },
            success: function (res) {
              console.log(res)
   
              that.data.friends[0].user_name = res.data[0].user_name
              that.setData({
                friends: that.data.friends
              })
            }
          })
        }
        if (res.data.length > 1) {
          var tempid = res.data[1].user_id;
          qcloud.request({
            url: config.service.getuserinfoUrl,
            data: {
              id: tempid
            },
            login: true,
            header: { 'Content-Type': 'application/json' },
            success: function (res) {
              console.log(res)
              that.data.friends[1].user_id = tempid
              that.data.friends[1].user_name = res.data[0].user_name
              that.setData({
                friends: that.data.friends
              })
            }
          })
        }
        if (res.data.length > 2) {
          var tempid = res.data[2].user_id;
          qcloud.request({
            url: config.service.getuserinfoUrl,
            data: {
              id: tempid
            },
            login: true,
            header: { 'Content-Type': 'application/json' },
            success: function (res) {
              console.log(res)
              that.data.friends[2].user_id = tempid
              that.data.friends[2].user_name = res.data[0].user_name
              that.setData({
                friends: that.data.friends
              })
            }
          })
        }
      }
    })
  },
  plase_homepage:function(){
    wx.navigateTo({
      url: 'placehomepage?adrid=' + this.data.adrid
    })
  },
  homepage: function () {
    wx.switchTab({
      url: '../timeline/timeline',
    })
  },
  mayorHP: function () {
    var that = this;
    wx.navigateTo({
      url: '../personal/homepage?id=' + that.data.mayor[0].user_id + '&username=' + that.data.mayor[0].user_name
    })
  },
  friendHP: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    wx.navigateTo({
      url: '../personal/homepage?id=' + that.data.friends[index].user_id + '&username=' + that.data.friends[index].user_name
    })
}
})