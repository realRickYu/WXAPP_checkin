var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data:{
    databaseaddress:'正在定位...',
    adrid: '',
    newAdrLati:'',
    newAdrLongi: '',
    publicpublish:true,
    imageList: [],
    inputValue: '',
    source:'database'
  },
  onLoad: function(){
    wx.removeStorageSync('source')
    wx.removeStorageSync('adrname')
    wx.removeStorageSync('adrid')
    wx.removeStorageSync('lati')
    wx.removeStorageSync('longi')
    var that = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          latitude : res.latitude,
          longitude : res.longitude
        })
        var lati = res.latitude
        var longi = res.longitude
        //向服务器上传经纬度换离当前位置最近的自建地址
        qcloud.request({
          url: config.service.getnearestadrUrl,
          data: {
            latitude: lati,
            longitude: longi
          },
          login: true,
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            console.log(res)
            that.setData({
              databaseaddress: res.data[0].place_name,
              adrid: res.data[0].id
            })
          }
        })
      },
    })
  },
  onShow: function (){
    //读跳转后传回的数据
    var that=this;
    var source = (wx.getStorageSync('source') || 'database' );
    var adrname = (wx.getStorageSync('adrname') ||that.data.databaseaddress);
    if (source == 'database')
    {
      var adrid = (wx.getStorageSync('adrid') || that.data.adrid);
      this.setData({
        source: source,
        databaseaddress: adrname,
        adrid: adrid
      })
    } else if (source == 'useradded')
    {
      var lati = wx.getStorageSync('lati');
      var longi = wx.getStorageSync('longi');
      this.setData({
        source: source,
        newAdrLati: lati,
        newAdrLongi: longi,
        databaseaddress: adrname,
      })
    }
  },
  onPullDownRefresh: function (){
    var that = this
    wx.getLocation({
      success: function (res) {
        that.setData({
          databaseaddress: '正在定位...',
          adrid: '',
          newAdrLati: '',
          newAdrLongi: '',
          source: 'database'
        })
        var lati = res.latitude
        var longi = res.longitude
        //向服务器上传经纬度换离当前位置最近的自建地址
        qcloud.request({
          url: config.service.getnearestadrUrl,
          data: {
            latitude: lati,
            longitude: longi
          },
          login: true,
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            that.setData({
              databaseaddress: res.data[0].place_name,
              adrid: res.data[0].id
            })
          }
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  switchChange: function (e) {
    var that = this
    that.setData({
      publicpublish: !e.detail.value
    })
  },
  chooseImage:function(){
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      },
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  cancel:function(){
    wx.switchTab({
      url: '../timeline/timeline',
    })
  },
  upload: function () {
    var that = this;
    //上传状态至服务器(分有无照片两种)
    var imagelist = that.data.imageList;
    var adrid = that.data.adrid;
    var input = that.data.inputValue;
    var publicpublish = that.data.publicpublish;
    var sendtime = new Date().getTime();
    if (imagelist.length == 0) {
      //无图上传
      qcloud.request({
        url: config.service.comwithoutpicUrl,
        data: {
          id: getApp().globalData.userId,
          adrid: adrid,
          sendtime: sendtime,
          text: input,
          publicpublish: publicpublish
        },
        login: true,
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          wx.redirectTo({ url: '../place/placeinfo?adrid=' + adrid })
        },
        fail: function ({ errMsg }) {
          wx.showToast({
            title: '抱歉，发送失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    } else {
      //有图上传
      wx.uploadFile({
        url: config.service.comwithpicUrl,
        filePath: imagelist[0],
        name: 'file',
        formData: {
          id: getApp().globalData.userId,
          adrid: adrid,
          sendtime: sendtime,
          text: input,
          publicpublish: publicpublish
        },
        login: true,
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('uploadImage success, res is:', res)
          wx.redirectTo({ url: '../place/placeinfo?adrid=' + adrid })
        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
          wx.showToast({
            title: '抱歉，发送失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  },
  publish:function(){
    var that = this;
    var adrname = that.data.databaseaddress;
    if (adrname =='正在定位...')
    {
      wx.showToast({
        title: '还没找到您的位置，建议点击“正在定位...”手动选择',
        icon: 'none',
        duration: 1500
      })
      return;
    }

    //如果使用新建地点，先上传新地点，新地点的ID由后端分配并返回
    var adrsource = that.data.source;
    if (adrsource == 'useradded')
    {
      var lati = that.data.newAdrLati;
      var longi = that.data.newAdrLongi;
      var adrname = that.data.databaseaddress;
      qcloud.request({
        url: config.service.newadrUrl,
        data: {
          latitude: lati,
          longitude: longi,
          adrname: adrname
        },
        login: true,
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res.data)
          that.setData({
            adrid: res.data[0]["max(`id`)"]
          })
          that.upload()
        }
      })
    } else
    {
      that.upload()
    }


  },
}) 