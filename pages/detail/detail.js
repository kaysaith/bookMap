// pages/detail/detail.js

import { Api } from '../../common/api'
import { Utils } from '../../common/component'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    scrollViewHeight: 0,
    tags: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    

    this.data.info = JSON.parse(options.pageInfo)
    wx.setNavigationBarTitle({ title: this.data.info.name })
    this.setData({ 
      scrollViewHeight: wx.getSystemInfoSync().windowHeight,
      bookCover: this.data.info.src,
      position: this.data.info.position,
      tags: Utils.convertStringByComma(this.data.info.tag)
    })
  },

  modify: function() {
    this.editor.switchOverlay({
      info: this.data.info, 
      isEditor: true
    })
  },

  onReady: function() {
    this.editor = this.selectComponent("#editor")
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  hasBeenCreated: function() {
    
    getThisBookInfo(this, (info) => {
      
      const that = this
      const pages = getCurrentPages();
      const currPage = pages[pages.length - 1];   // 当前页面
      const prevPage = pages[pages.length - 2];  // 上一个页面

      const newData = prevPage.data.homeBooks.map((it) => {
        if (it.id === info.id) it = info
        return it
      })
      // 直接调用上一个页面的setData()方法，把数据存到上一个页面中并更新上一个页面的界面
      prevPage.setData({ homeBooks: newData })
    })
  }
})

function getThisBookInfo(that, callback) {
  wx.request({
    url: Api.updateTargetBookInfo,
    data: {
      bookID: that.data.info.id
    },
    success: (result) => {
      that.setData({
        bookCover: result.data.Cover,
        position: 'Row ' + result.data.Row + ' Column ' + result.data.ColumnIndex,
        tags: Utils.convertStringByComma(result.data.Tag)
      })

      that.data.info = Utils.bookModel(result.data)
      wx.setNavigationBarTitle({ title: that.data.info.name })

      if (typeof callback === 'function') callback(that.data.info)
    }
  })
}

