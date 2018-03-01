// pages/familyMember/detail.js

import { Utils } from '../../common/component'
import { Api } from '../../common/api'

let members = []

let info = {
  memberID: '',
  selfOpenID: ''
}

Page({
  
  data: {
    showOverlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    getMemberList((userInfoList) => {
      userInfoList.forEach(it => {
        members.push(it)
      })
      that.setData({
        array: members,
      })
    })
  },

  addMember: function() {
    this.setData({
      showOverlay: !this.data.showOverlay
    })
  },

  getUserID: function(content) {
    info.memberID = content.detail.value
  },

  confirm: function() {
    this.setData({
      showOverlay: !this.data.showOverlay
    })
    addFamilyMember()
  },

  cancel: function() {
    this.setData({
      showOverlay: !this.data.showOverlay
    })
  },

  deleteMember: function() {
    wx.showModal({
      title: '删除成员',
      content: '你确认要删除这位成员么?',
    })
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

function addFamilyMember() {
  wx.showLoading({ title: '正在创建' })
  Utils.getUserInfo((result) => {
    info.selfOpenID = result.openid
    wx.request({
      url: Api.addMember,
      data: {
        shelfID: result.shelfID,
        memberID: info.memberID
      },
      success: (response) =>  wx.hideLoading(),
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '创建失败' })
      }
    })
  })
}

function getMemberList(hold) {
  wx.showLoading({ title: '正在获取列表' })
  Utils.getUserInfo((userInfo) => {
    wx.request({
      url: Api.getMemberList,
      data: {
        shelfID: userInfo.shelfID
      },
      success: (result) => {
        wx.hideLoading()
        hold(result.data)
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '加载列表失败' })
      }
    })
  })
}