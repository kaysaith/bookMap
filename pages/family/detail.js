// pages/family/detail.js

import { Api } from '../../common/api'
import { Utils } from '../../common/component'

Page({

  /**
   * 页面的初始数据
   */
  data: {

    showFamilyList: true,
    shelfList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getShelfList(this)
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
  
  }
})

function getShelfList(that) {
  Utils.getUserInfo((userInfo) => {
    wx.request({
      url: Api.getShelfList,
      data: {
        openid: userInfo.openid
      },
      success: (result) => {
        const resultList = result.data.map((it) => {  return shelfModel(it)})
        that.setData({ shelfList: resultList })
      }
    })
  })
}

function shelfModel(data) {
  return {
    shelfID: data.ShelfID,
    name: data.Nick,
    description: data.booksCount +  ' books in this shelf'
  }
}