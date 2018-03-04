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

  goToShelfDetail: function(event) {
    wx.setStorage({
      key: Utils.appKeyValue.currentShelfID,
      data: event.currentTarget.dataset.shelfid,
      success: () => {
        const data = {
          memberName: event.currentTarget.dataset.membername ,
          booksCount: event.currentTarget.dataset.bookscount 
        }
        // 存储成功书柜 `shelfID` 后跳转到书柜页面
        wx.navigateTo({ url: '../home/home?pageInfo=' + JSON.stringify(data) })
      }
    })
  },

  onUnload: function () {
    wx.removeStorage({ key: Utils.appKeyValue.currentShelfID })
  }
})

function getShelfList(that) {
  Utils.getUserInfo((userInfo) => {
    wx.request({
      url: Api.getShelfList,
      data: {
        openid: userInfo.openID
      },
      success: (result) => {
        const resultList = result.data.map((it) => {  return shelfModel(it) })
        that.setData({ shelfList: resultList })
      }
    })
  })
}

function shelfModel(data) {
  return {
    shelfID: data.ShelfID,
    name: data.Nick,
    description: data.booksCount +  ' books in this shelf',
    booksCount: data.booksCount
  }
}