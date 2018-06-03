var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
    }],
    getloc:true,
    tencentaddress:'',
    radiov:'tencent',
    inputValue: '',
  },
  onLoad: function () {
    var that = this
    wx.getLocation({
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          'markers.latitude': parseFloat(res.latitude),
          'markers.longitude': parseFloat(res.longitude),
        })
      },
    })
  },
  choosetencent_add: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          tencentaddress: res.name,
          getloc:false
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  confirm_add:function(){
    var radiov = this.data.radiov;
    if (radiov == 'tencent') {
      var adr = this.data.tencentaddress;
    }
    else if (radiov == 'new') {
      var adr = this.data.inputValue;
      if (adr == '') {
        wx.showToast({
          title: '您忘记写地址名称了~',
          icon: 'none',
          duration: 1500
        })
        return;
      }
    }

    wx.setStorageSync('source', 'useradded')
    var lati = this.data.latitude;
    var longi = this.data.longitude;
    wx.setStorageSync('lati', lati)
    wx.setStorageSync('longi', longi)
    wx.setStorageSync('adrname', adr)
    wx.navigateBack({
      delta: 2
    })
  },
  radioChange: function (e) {
    var that=this
    that.setData({
      radiov: e.detail.value
    })
  }
})