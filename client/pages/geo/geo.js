var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value; //获取表单所有input的值    
    // wx.request({
    //   url: '',
    //   data: formData,
    //   header: { 'Content-Type': 'application/json' },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]
        console.log(filePath)

        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            formData
          },
          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })
      },
      fail: function (e) {
        console.error(e)
      }
    })
    
  }
}) 