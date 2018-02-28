// pages/home/home.js

import { Api } from '../../common/api'
import { Utils } from '../../common/component'

const homeBooks = []
const searchBooks = []

Page({

  /**
   * 页面的初始数据
   */

  data: {
    showSearchResult: false,
    resultHeight: 0,
    scrollViewHeight: 0,
    showCreateButton: true,
    showCancelButton: false,
    showSettingsView: false,
    showEmptyView: false
  },

  upper: function (e) {
    // 滚动触底的时候执行
    flipPage(this)
  },

  scroll: function() {
    console.log('scroll')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      scrollViewHeight: wx.getSystemInfoSync().windowHeight - 130,
      resultHeight: wx.getSystemInfoSync().windowHeight - 130
    })

  },

  showResult: function() {
    this.setData({
      showCancelButton: true,
      showCreateButton: false,
      showSearchResult: true
    })
  },

  cancelSearch: function() {
    this.setData({
      showCancelButton: false,
      showCreateButton: true,
      showSearchResult: false
    })
  },

  goToDetail: (event) => {
    wx.navigateTo({
        url: '../detail/detail?pageInfo=' + JSON.stringify(searchBooks[event.currentTarget.dataset.index])
    })
  },

  showSettings: function() {
    this.settings.switchSettings()
  },

  showEditor: function() {
    this.editor.switchOverlay()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得 `settings` 组件
    this.settings = this.selectComponent("#settings")
    this.editor = this.selectComponent("#editor")
    flipPage(this)
  },

  hasBeenCreated: function() {
    refreshPage(this)
  }
})

let currentPageCount = 0
let isNoMorePage = false
const singlePageCount = 10

function refreshPage(that) {
  currentPageCount = 0
  isNoMorePage = false
  homeBooks.splice(0, homeBooks.length)
  searchBooks.splice(0, searchBooks.length)
  flipPage(that)
}

function flipPage(that) {
  if (isNoMorePage) return // 如果没有更多就不用向下执行了
  wx.showLoading({ title: '正在加载图书' })
  getBooks(currentPageCount, (books) => {
    // 如果已经拉不到整页的数据意味当下已经拉完了服务器的数据
    if (books.length < singlePageCount) isNoMorePage = true
    // 如果没有拉取导数据执行占位图提前跳出这个方法
    if (books.length === 0) { 
      that.setData({ showEmptyView: true })
      wx.hideLoading()
      return
    }

    let maxCount = books.length < singlePageCount ? books.length : singlePageCount
    for (let index = currentPageCount; index < currentPageCount + maxCount; index++) {
      homeBooks.push({
        src: books[index - currentPageCount].Cover,
        name: books[index - currentPageCount].Name,
        id: books[index - currentPageCount].ID
      })
      searchBooks.push({
        src: books[index - currentPageCount].Cover,
        name: books[index - currentPageCount].Name,
        position: 'Row' + books[index - currentPageCount].Row + ' Column ' + books[index - currentPageCount].ColumnIndex
      })
    }

    currentPageCount += books.length
    that.setData({
      showEmptyView: false,
      array: homeBooks,
      resultList: searchBooks,
    })
    wx.hideLoading()
  })
}

function getBooks(startIndex, hold) {
  wx.getStorage({
    key: 'account',
    success: function(res) {
      const openid = res.data.openid
      requestFromServer()
      // 如此设立是为了方便失败回调
      function requestFromServer() {
        wx.request({
          url: Api.getBooks,
          data: {
            openid: openid,
            startIndex: startIndex
          },
          success: (result) => {
            if (typeof hold === 'function') hold(result.data)
          },
          fail: () => Utils.retry(requestFromServer)
        })
      }
    },
    fail: () => {
      wx.removeStorage({
        key: 'account',
        success: function(res) {
          wx.redirectTo({ url: '../index/index' })
          wx.showModal({
            title: '用户信息过期',
            content: '本地记录的用户信息过期请重新登录',
          })
        }
      })
    }
  })
}