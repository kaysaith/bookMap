
import { Api } from '../api.js'

// common/editor/editor.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showView: false,
    hasUploaded: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示悬浮曾的开关
    switchOverlay: function () {
      this.setData({
        showView: !this.data.showView
      })

      // 悬浮曾关闭后恢复初始值
      if (this.data.showView === false) this.setData({ hasUploaded: false })
    },
    uploadCover: function () {
      chooseImage((path) => {
        this.setData({ hasUploaded: true })
        wx.uploadFile({
          url: Api.uploadCover,
          filePath: path,
          name: 'file',
          header: {
            "content-type": 'multipart/form-data'
          },
          success: function (res) {
            var data = res.data
            //do something
            console.log('hello')
          },
          fail: () => {
            console.log("what happen")
          }
        })
      })
    },
    getInputText: function(content) {
      console.log(content.detail.value)
    }
  }
})


function chooseImage(callback) {
  wx.chooseImage({
    success: function (response) {
      // 获取图片本地路径
      if (typeof callback === 'function')
        callback(response.tempFilePaths[0])
      console.log(response.tempFilePaths[0])
    },
  })
}
