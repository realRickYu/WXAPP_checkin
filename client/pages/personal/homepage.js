// pages/personal/homepage.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    searchLoading: true, //"上拉加载"的变量，默认true，显示  
    searchLoadingComplete: false,  //“没有更多”的变量，默认false，隐藏
    username:'',
    id:'',
    friendflag:false,
    added:false,
    endtime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      id: options.id,
      username: options.username,
    })
    qcloud.request({
      url: config.service.relationUrl,
      data: {
        id: getApp().globalData.userId,
        otherpersonid: options.id
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          friendflag: res.data
        })
      }
    })
    var starttime = new Date().getTime();
    console.log(starttime)
    qcloud.request({
      url: config.service.otherpersonUrl,
      data: {
        otherpersonid: options.id,
        starttime: starttime
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        var index = res.data.length - 1;
        if (index == -1) {
          that.setData({
            searchLoading: false,
            searchLoadingComplete: true
          })
          return
        }
        var endtime = res.data[index].date;
        that.setData({
          endtime: endtime
        })

        var templist = res.data;
        var textid = [];
        for (var i = 0; i < res.data.length; i++) {
          var date = new Date(res.data[i].date);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          var sendtime = Y + M + D + h + m + s;
          templist[i].sendtime = sendtime;
          textid.push(templist[i].id);
        }
        that.setData({
          list: templist,
        })
        qcloud.request({
          url: config.service.likegroupUrl,
          data: {
            recordid: JSON.stringify(textid)
          },
          login: true,
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            console.log(res.data)
            for (var i = 0; i < templist.length; i++) {
              var likenumber = res.data[i].length;
              var liked = false;
              for (var j = 0; j < res.data[i].length; j++) {
                if (res.data[i][j].ori_id == getApp().globalData.userId) {
                  liked = true;
                  break;
                }
              }
              templist[i].liked = liked;
              templist[i].likenumber = likenumber;
            }
            that.setData({
              list: templist,
            })
          }
        })
      }
    })
  },
  fetchSearchList: function () {
    var that = this;
    var starttime = that.data.endtime;
    console.log(starttime)
    qcloud.request({
      url: config.service.otherpersonUrl,
      data: {
        otherpersonid: that.data.id,
        starttime: starttime
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        var index = res.data.length - 1;
        if (index == -1) {
          that.setData({
            searchLoading: false,
            searchLoadingComplete: true
          })
          return
        }
        var endtime = res.data[index].date;
        that.setData({
          endtime: endtime
        })

        var templist = res.data;
        var textid = [];
        var orilength = that.data.list.length;
        for (var i = 0; i < res.data.length; i++) {
          var date = new Date(res.data[i].date);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          var sendtime = Y + M + D + h + m + s;
          templist[i].sendtime = sendtime;
          textid.push(templist[i].id);
        }
        var searchList = that.data.list.concat(templist)
        qcloud.request({
          url: config.service.likegroupUrl,
          data: {
            recordid: JSON.stringify(textid)
          },
          login: true,
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            console.log(res.data)
            for (var i = 0; i < templist.length; i++) {
              var likenumber = res.data[i].length;
              var liked = false;
              for (var j = 0; j < res.data[i].length; j++) {
                if (res.data[i][j].ori_id == getApp().globalData.userId) {
                  liked = true;
                  break;
                }
              }
              searchList[i + orilength].liked = liked;
              searchList[i + orilength].likenumber = likenumber;
            }
            that.setData({
              list: searchList,
            })
          }
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var imageList = [];
    imageList[0] = current;
    wx.previewImage({
      current: current,
      urls: imageList
    })
  },
  like: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    var textid = that.data.list[index].textid;
    qcloud.request({
      url: config.service.likeUrl,
      data: {
        id: getApp().globalData.userId,
        textid: textid
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      //返回userID或者未注册过的标识
      success: function (res) {
        var listliked = "list[" + index + "].liked";
        var listlikenumber = "list[" + index + "].likenumber";
        var likenumber = (parseInt(that.data.list[index].likenumber) + 1).toString();
        that.setData({
          [listliked]: 'true',
          [listlikenumber]: likenumber
        })
      }
    })
  },
  addfriend:function(){
    var that=this;
    qcloud.request({
      url: config.service.addfriendUrl,
      data: {
        id: getApp().globalData.userId,
        otherpersonid: that.data.id
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({
          added: true
        })

    }
    })
  },
  backtoSwitch:function(){
    wx.switchTab({
      url: '../timeline/timeline',
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
    var that = this;
    var starttime = new Date().getTime();
    qcloud.request({
      url: config.service.otherpersonUrl,
      data: {
        otherpersonid: options.id,
        starttime: starttime
      },
      login: true,
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        var index = res.data.length - 1;
        if (index == -1) {
          that.setData({
            searchLoading: false,
            searchLoadingComplete: true
          })
          return
        }
        var endtime = res.data[index].date;
        that.setData({
          endtime: endtime
        })

        var templist = res.data;
        var textid = [];
        for (var i = 0; i < res.data.length; i++) {
          var date = new Date(res.data[i].date);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          var sendtime = Y + M + D + h + m + s;
          templist[i].sendtime = sendtime;
          textid.push(templist[i].id);
        }
        that.setData({
          list: templist,
        })
        qcloud.request({
          url: config.service.likegroupUrl,
          data: {
            recordid: JSON.stringify(textid)
          },
          login: true,
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            console.log(res.data)
            for (var i = 0; i < templist.length; i++) {
              var likenumber = res.data[i].length;
              var liked = false;
              for (var j = 0; j < res.data[i].length; j++) {
                if (res.data[i][j].ori_id == getApp().globalData.userId) {
                  liked = true;
                  break;
                }
              }
              templist[i].liked = liked;
              templist[i].likenumber = likenumber;
            }
            that.setData({
              list: templist,
            })
          }
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