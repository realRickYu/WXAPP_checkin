// pages/timeline/timeline.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    endtime:'',
    searchLoading: true, //"上拉加载"的变量，默认true，显示  
    searchLoadingComplete: false,  //“没有更多”的变量，默认false，隐藏
    list:[
      {userid:'1234',username:'大王',textid:'4321',sendtime:'201806070201',textvalue:'good night',imgUrl:'',
      adrid:'42',adrname:'家',likenumber:'2',liked:'true'},
      {
        userid: '12345', username: '小王', textid: '54321', sendtime: '201806070101', textvalue: 'good day', imgUrl: 'https://qcloudtest-1256531448.cos.ap-guangzhou.myqcloud.com/1528264326845-BkJcIlBeQ.jpg',
        adrid: '41', adrname: '学校', likenumber: '0', liked: 'false'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // var starttime = new Date();

    // qcloud.request({
    //   url: config.service.timelineUrl,
    //   data: {
    //     id: getApp().globalData.userId,
    //     starttime: starttime
    //   },
    //   login: true,
    //   header: { 'Content-Type': 'application/json' },
    //   success: function (res) {
    //     console.log(res.data)
    //     var index = res.data.list.length - 1;
    //     if (index==-1)
    //     {
    //       that.setData({
    //         searchLoading: false,
    //         searchLoadingComplete: true
    //       })
    //       return
    //     }
    //     var endtime = res.data.list[index].sendtime;
    //     that.setData({
    //       list: res.data.list,
    //       endtime:endtime
    //     })
    //   }
    // })
  },
  fetchSearchList: function () {
    var that=this;
    var starttime = that.data.endtime;
    qcloud.request({
      url: config.service.timelineUrl,
      data: {
        id: getApp().globalData.userId,
        starttime: starttime
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        var index = res.data.list.length - 1;
        if (index == -1) {
          that.setData({
            searchLoading: false,
            searchLoadingComplete: true
          })
          return
        }
        var endtime = res.data.list[index].sendtime;
        var searchList = that.data.list.concat(res.data.list)
        that.setData({
          list: searchList,
          endtime: endtime
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var imageList=[];
    imageList[0]=current;
    wx.previewImage({
      current: current,
      urls: imageList
    })
  },
  unlike: function (e) {
    console.log(e)
  },
  like: function (e) {
    console.log(e)
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
    var that = this;
    var starttime = new Date();

    qcloud.request({
      url: config.service.timelineUrl,
      data: {
        id: getApp().globalData.userId,
        starttime: starttime
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        var index = res.data.list.length - 1;
        if (index == -1) {
          that.setData({
            searchLoading: false,
            searchLoadingComplete: true
          })
          return
        }
        var endtime = res.data.list[index].sendtime;
        that.setData({
          list: res.data.list,
          endtime: endtime
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.fetchSearchList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})