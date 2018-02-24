// pages/home/home.js

import { Component } from '../../common/component'

const covers = [
  'https://img3.doubanio.com/lpic/s29642615.jpg',
  'https://img1.doubanio.com/lpic/s29602519.jpg',
  'https://img3.doubanio.com/lpic/s29642731.jpg',
  'https://img3.doubanio.com/lpic/s29632235.jpg',
  'https://img3.doubanio.com/lpic/s29594034.jpg',
  'https://img1.doubanio.com/lpic/s29675389.jpg',
  'https://img3.doubanio.com/lpic/s29668376.jpg',
  'https://img3.doubanio.com/lpic/s29676191.jpg',
  'https://img3.doubanio.com/lpic/s29652156.jpg',
  'https://img3.doubanio.com/lpic/s29664110.jpg'
]

const names = [
  "Say You're Sorry (Morgan Dane Book 1)",
  "The Girl You Left Behind: A Novel",
  "Before We Were Yours: A Novel",
  "The Very Hungry Caterpillar Eric Carle",
  "White Rose, Black Forest",
  "Say You're Sorry (Morgan Dane Book 1)",
  "The Girl You Left Behind: A Novel",
  "Before We Were Yours: A Novel",
  "The Very Hungry Caterpillar Eric Carle",
  "White Rose, Black Forest"
]

const id = [
  1920,
  1921,
  1922,
  1923,
  1924,
  1925,
  1926,
  1927,
  1928,
  1929,
]

const positon = [
  'column 3 row 2',
  'column 2 row 6',
  'column 4 row 8',
  'column 6 row 1',
  'column 1 row 3',
  'column 3 row 2',
  'column 2 row 6',
  'column 4 row 8',
  'column 6 row 1',
  'column 1 row 3',
]

const data = []

const item = []

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */

  data: {
    showView: false,
    showSearchResult: false,
    resultHeight: 0,
    hasUploaded: false,
    scrollViewHeight: 0,
    showCreateButton: true,
    showCancelButton: false
  },

  upper: function (e) {
    console.log('hello')
  },

  scroll: function() {
    console.log('shit')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    for (let index = 0; index < 10; index++) {
      data.push({ 
        src: covers[index],
        name: names[index],
        id: id[index]
      })

      item.push({
        src: covers[index],
        name: names[index],
        position: positon[index]
      })
    }
    
    this.setData({
      array: data,
      resultList: item
    })

    this.setData({
      scrollViewHeight: wx.getSystemInfoSync().windowHeight - 130,
      resultHeight: wx.getSystemInfoSync().windowHeight - 130
    })

  },

  // 显示悬浮曾的开关
  showOverlay: function () {
    this.setData({
      showView: !this.data.showView
    })

    // 悬浮曾关闭后恢复初始值
    if (this.data.showView === false) this.setData({ hasUploaded: false })
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

  goToDetail: function (event) {
    let pageInfo = JSON.stringify(data[event.currentTarget.dataset.index])
    wx.navigateTo({
      url: '../detail/detail?pageInfo=' + pageInfo
    })
  },

  uploadCover: function() {
    Component.chooseImage(() => this.setData({ hasUploaded: true }))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})