// pages/home/home.js

import { Api } from '../../common/api'
import { Utils } from '../../common/component'

Page({

  data: {
    showSearchResult: false,
    resultHeight: 0,
    scrollViewHeight: 0,
    showCreateButton: true,
    showCancelButton: false,
    showSettingsView: false,
    showEmptyView: false,

    homeBooks: [],
    isNoMorePage: false,
    searchKeyword: '',
    resultList: [],
    defaultSearchInputValue: '',

    isPullEvent: false,
    scrollTopValue: 0,

    loadingDescription: '正在加载图书',

    isLongClick: false
  },

  upper: function (e) {
    // 滚动触底的时候执行
    flipPage(this)
  },


  /* 
  * 因为设定了 `Header` 部分禁止滑动, 所以没有办
  * 法直接使用 `PullDownFresh` 方法, 这里联合判断下拉刷新
  */
  scroll: function (event) {
    if (!this.data.isPullEvent) 
      this.data.isPullEvent = event.detail.scrollTop < -100 
  },

  touchEnd: function(event) {
    if (this.data.isPullEvent) refreshPage(this)
  },

  longClick: function(event) {
    this.setData({ isLongClick: true })
    wx.showModal({
      title: '删除图书',
      content: '确定要删除这本书么?',
      success: (result) => {
        if (result.confirm) deleteBook(this, event.currentTarget.dataset.id)
        else if (result.cancel) this.setData({ isLongClick: false })
      }
    })
  },

  onLoad: function (options) {

    flipPage(this)
    
    this.setData({
      scrollViewHeight: wx.getSystemInfoSync().windowHeight - 130,
      resultHeight: wx.getSystemInfoSync().windowHeight - 130
    })
  },

  showResult: function() {
    this.setData({
      showCancelButton: true,
      showCreateButton: false,
      showSearchResult: true,
      showEmptyView: this.data.resultList.length === 0
    })
  },

  cancelSearch: function() {
    this.setData({
      showCancelButton: false,
      showCreateButton: true,
      showSearchResult: false,
      showEmptyView: false,
      defaultSearchInputValue: "",
      resultList: []
    })
  },

  goToDetail: function(event) {
    if (this.data.isLongClick) return
    const data = JSON.stringify(this.data.homeBooks [event.currentTarget.dataset.index])
    wx.navigateTo({ url: '../detail/detail?pageInfo=' + data })
  },

  goToDetailFromSearchResult: function (event) {
    const data = JSON.stringify(this.data.resultList[event.currentTarget.dataset.index])
    wx.navigateTo({ url: '../detail/detail?pageInfo=' + data })
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
  },

  onUnload: function () {
    // 当页面卸载的时候恢复本页面存储的状态
    currentPageCount = 0
  },

  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
    }
   },

  // 获取搜索关键词
  getKeyword: function (content) {
    this.data.searchKeyword = content.detail.value
  },

  search: function () {
    getSearchedResult(this)
  },

  hasBeenCreated: function() {
    refreshPage(this)
  }
})

function deleteBook(that, bookID) {
  wx.request({
    url: Api.deleteBook,
    data: { bookID: bookID },
    success: () => refreshPage(that)
  })
}

// 执行搜索并获取结果的数组对象
function getSearchedResult(that) {
  wx.showLoading({ title: '正在搜索' })
  Utils.getUserInfo((userInfo) => {
    wx.request({
      url: Api.searchBook,
      data: {
        keyword: that.data.searchKeyword,
        shelfID: userInfo.shelfID
      },
      success: (result) => {
        // 如果没有搜索结果设置状态后提前退出
        if (result.data.length == 0) {
          that.setData({ showEmptyView: true })
          wx.hideLoading()
          return
        }
        // 把网络数据转换成本地 `Model`
        const searchResult = result.data.map((it) => {
          return Utils.bookModel(it)
        })
        // 更新UI
        that.setData({  resultList: searchResult })
        wx.hideLoading()
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '搜索失败' })
      }
    })
  })
}

let currentPageCount = 0
const singlePageCount = 10

// 下拉刷新的方法
function refreshPage(that) {
  that.data.homeBooks.splice(0, that.data.homeBooks.length)
  that.data.loadingDescription = '正在刷新数据'
  currentPageCount = 0
  flipPage(that)
  // 滚动到最顶部
  that.setData({
    scrollTopValue: 0,
    isNoMorePage: false,
    isPullEvent: false,
    loadingDescription: '正在加载图书'
  })
}

function flipPage(that) {
  if (that.data.isNoMorePage) return // 如果没有更多就不用向下执行了
  wx.showLoading({ title: that.data.loadingDescription })
  getBooks(currentPageCount, (books) => {
    // 如果已经拉不到整页的数据意味当下已经拉完了服务器的数据
    if (books.length < singlePageCount) that.data.isNoMorePage = true
    // 如果没有拉取导数据执行占位图提前跳出这个方法
    if (books.length === 0 && that.data.homeBooks.length === 0) { 
      that.setData({ showEmptyView: true })
      wx.hideLoading()
      return
    }

    let maxCount = books.length < singlePageCount 
    ? books.length 
    : singlePageCount
    
    for (
      let index = currentPageCount; 
      index < currentPageCount + maxCount; 
      index++
    ) {
      that.data.homeBooks
        .push(Utils.bookModel(books[index - currentPageCount]))
    }

    currentPageCount += books.length
    that.setData({
      showEmptyView: false,
      homeBooks: that.data.homeBooks,
    })
    wx.hideLoading()
  })
}

function getBooks(startIndex, hold) {
  Utils.getUserInfo((userInfo) => {
    requestFromServer()
    // 如此设立是为了方便失败回调
    function requestFromServer() {
      wx.request({
        url: Api.getBooks,
        data: {
          shelfID: userInfo.shelfID,
          startIndex: startIndex
        },
        success: (result) => {
          if (typeof hold === 'function') hold(result.data)
        },
        fail: () => Utils.retry(requestFromServer)
      })
    }
  })
}