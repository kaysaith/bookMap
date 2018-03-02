
import { Api } from '../api.js'
import { Utils } from '../component.js'

const bookInfo = {
  name: '',
  tag: '',
  cover: '',
  row: 0,
  columnIndex: 0,
  bookID: 0
}

const existBookInfo = {}

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
    isEditor: false,
    showView: false,
    hasUploaded: false,
    bookNameInput: '',
    bookTagInput: '',
    columnInput: '',
    rowInput: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示悬浮曾的开关
    switchOverlay: function (params = { info: Object, isEditor: Boolean }) {
      // 通过父级调用自定义组件这个方法进行传值
      if (params.isEditor === true) {
        // 在编辑模式下更新 `UI` 显示的内容
        this.setData({
          isEditor: true,
          bookNameInput: params.info.name,
          bookTagInput: params.info.tag,
          rowInput: params.info.row,
          columnInput: params.info.column
        })
        // 把值转换为编辑器需要的值
        bookInfo.name = params.info.name
        bookInfo.tag = params.info.tag
        bookInfo.row = params.info.row
        bookInfo.columnIndex = params.info.column
        bookInfo.bookID = params.info.id
        bookInfo.cover = params.info.src
      }
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
      if (bookInfo.cover.length * bookInfo.name.length !== 0) {
        // 首先执行耗时的上传封面并获取七牛的网络地址
        wx.uploadFile({
          url: Api.uploadCover,
          filePath: bookInfo.cover,
          name: 'file',
          success: function (res) { 
            // 成功后便持有了全部数据, 开始执行创建图书的操作
            updateInfo({
              page: that, 
              cover: res.data, 
              isEditor: false
            }) 
          },
          fail: (event) => console.log(JSON.stringify(event))
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
    },

    modifyBook: function() {
      const that = this
      if (!this.data.hasUploaded) {
        // 没有更改图片那么维持原图数据更新即可
        updateInfo({
          page: this,
          cover: bookInfo.cover,
          isEditor: true
        }) 
      } else {
        wx.uploadFile({
          url: Api.uploadCover,
          filePath: bookInfo.cover,
          name: 'file',
          success: function (res) {
            // 成功后便持有了全部数据, 开始执行创建图书的操作
            updateInfo({
              page: that,
              cover: res.data,
              isEditor: true
            })
          }
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

function updateInfo(params = { page, cover, isEditor }) {
  let apiUrl = params.isEditor ? Api.modifyBookInfo : Api.createBook
  
  wx.getStorage({
    key: 'account',
    success: function(res) { 
      let apiParameters = {
        name: bookInfo.name,
        cover: params.cover,
        tag: bookInfo.tag,
        row: bookInfo.row,
        columnIndex: bookInfo.columnIndex,
        shelfID: res.data.shelfID,
      }

      // 如果是编辑模式需要额外传入图书的 `ID`
      if (params.isEditor) apiParameters.bookID = bookInfo.bookID
      wx.request({
        url: apiUrl,
        data: apiParameters,
        success: function () {
          wx.hideLoading()
          wx.showToast({ title: '创建成功' })
          params.page.setData({ showView: !params.page.data.showView })
          // 完毕后关闭悬浮曾并清空接收器
          if (params.page.data.showView === false)
            params.page.setData({
              hasUploaded: false,
              bookNameInput: '',
              bookTagInput: '',
              columnInput: '',
              rowInput: ''
            })

          params.page.triggerEvent("hasBeenCreated")
        }
      })
    }
  })
}
