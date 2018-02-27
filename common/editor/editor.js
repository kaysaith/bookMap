
import { Api } from '../api.js'

const bookInfo = {
  name: '',
  tag: '',
  cover: '',
  row: 0,
  columnIndex: 0
}

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
          }
        })
      })
    },
    getBookName: function(content) {
      bookInfo.name = content.detail.value
    },
    getBookTag: function (content) {
      bookInfo.tag = content.detail.value
    },
    getColumnIndex: function (content) {
      bookInfo.columnIndex = parseInt(content.detail.value)
    },
    getRowIndex: function(content)  {
      bookInfo.row = parseInt(content.detail.value)
    },

    chooseCover: function() {
      chooseImage((path) => {
        this.setData({ hasUploaded: true })
        bookInfo.cover = path
      })
    },

    createBook: function() {
      console.log('hey baby')
      if (bookInfo.cover.length > 0) {

        wx.uploadFile({
          url: Api.uploadCover,
          filePath: bookInfo.cover,
          name: 'file',
          header: {
            "content-type": 'multipart/form-data'
          },
          success: function (res) {
            var data = res.data
            //do something
            const coverUrl = res.data
            wx.request({
              url: Api.createBook,
              data: {
                name: bookInfo.name,
                cover: coverUrl,
                tag: bookInfo.tag,
                row: bookInfo.row,
                columnIndex: bookInfo.columnIndex
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '请添加封面',
        })
      }
    }
  }
})


function chooseImage(callback) {
  wx.chooseImage({
    success: function (response) {
      // 获取图片本地路径
      if (typeof callback === 'function')
        callback(response.tempFilePaths[0])
    },
  })
}
