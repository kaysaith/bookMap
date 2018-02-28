
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
    infoInput: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示悬浮曾的开关
    switchOverlay: function () {
      this.setData({ showView: !this.data.showView })
      // 悬浮曾关闭后恢复初始值
      if (this.data.showView === false) this.setData({ hasUploaded: false })
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

    createBook: function () {
      const that = this
      wx.showLoading({ title: '正在创建' })
      // 检查关键数据是否填写
      if (bookInfo.cover.length * bookInfo.name.length != 0) {
        wx.uploadFile({
          url: Api.uploadCover,
          filePath: bookInfo.cover,
          name: 'file',
          success: function (res) { updateInfo(that, res.data) }
        })
      } else {
        if (bookInfo.name.length === 0 && bookInfo.cover.length === 0) {
          wx.showToast({ title: '请填写信息' })
        } else {
          if (bookInfo.name.length === 0) 
            wx.showToast({ title: '请填写书名' })
          if (bookInfo.cover.length === 0)
            wx.showToast({ title: '请添加封面' })
        }
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

function updateInfo(that, coverUrl) {
  wx.request({
    url: Api.createBook,
    data: {
      name: bookInfo.name,
      cover: coverUrl,
      tag: bookInfo.tag,
      row: bookInfo.row,
      columnIndex: bookInfo.columnIndex
    },
    success: function () {
      wx.hideLoading()
      wx.showToast({ title: '创建成功' })
      that.setData({ showView: !that.data.showView })
      // 完毕后关闭悬浮曾并清空接收器
      if (that.data.showView === false)
        that.setData({
          hasUploaded: false,
          infoInput: ''
        })
    },
    fail: () => Utils.retry(updateInfo)
  })
}
