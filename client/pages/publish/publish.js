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
    publicpublish:false,
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
        that.setData({
          latitude : res.latitude,
          longitude : res.longitude
        })
        var lati = res.latitude
        var longi = res.longitude
        //向服务器上传经纬度换离当前位置最近的自建地址
        wx.request({
          url: config.service.getnearestadrUrl,
          data: {
            latitude: lati,
            longitude: longi
          },
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            that.setData({
              databaseaddress: res.data.result.nearestadr,
              adrid: res.data.result.adrid
            })
          }
        })
      },
    })
  },
  onShow: function (){
    //读跳转后传回的数据
    var source = (wx.getStorageSync('source') || 'database' );
    var adrname = (wx.getStorageSync('adrname') ||'正在定位...');
    if (source == 'database')
    {
      var adrid = (wx.getStorageSync('adrid') || '');
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
        wx.request({
          url: config.service.getnearestadrUrl,
          data: {
            latitude: lati,
            longitude: longi
          },
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            that.setData({
              databaseaddress: res.data.result.nearestadr,
              adrid: res.data.result.adrid
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
      publicpublish: e.detail.value
    })
  },
  chooseImage:function(){
    var that = this
    wx.chooseImage({
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
      url: '../geo/geo',
    })
  },
  publish:function(){
    var that = this;
    var comment = that.data.inputValue;
    if (comment == '') {
      wx.showToast({
        title: '请不要闷声大发财',
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
      wx.request({
        url: config.service.newadrUrl,
        data: {
          latitude: lati,
          longitude: longi,
          adrname: adrname
        },
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          that.setData({
            adrid: res.data.result.adrid
          })
        }
      })
    }

    //上传状态至服务器(分有无照片两种)
    var imagelist = that.data.imageList;
    var adrid = that.data.adrid;
    var input = that.data.inputValue;
    var sendtime = new Date();
    if (imagelist.length==0)
    {
      //无图上传
      wx.request({
        url: config.service.comwithoutpicUrl,
        data: {
          id: app.globalData.userId,
          adrid: adrid,
          sendtime: sendtime,
          text:input,
        },
        header: { 'Content-Type': 'application/json' },
        // success: function (res) {
        //   that.setData({
        //     databaseaddress: res.data.result.nearestadr,
        //   })
        // }
      })
    } else
    {
      //有图上传
      wx.uploadFile({
        url: config.service.comwithpicUrl,
        filePath: imagelist,
        name: sendtime,
        formData: {
          id: app.globalData.userId,
          adrid: adrid,
          sendtime: sendtime,
          text: input,
        },
        success: function (res) {
          console.log('uploadImage success, res is:', res)
        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
        }
      })
    }
  },
}) 