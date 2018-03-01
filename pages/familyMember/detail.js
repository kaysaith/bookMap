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
    array: [],
    showOverlay: false
  },

  onLoad: function (options) {
    getMemberList(this)
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
    var that = this
    this.setData({
      showOverlay: !this.data.showOverlay
    })
    addFamilyMember(() => getMemberList(that))
  },

  cancel: function() {
    this.setData({
      showOverlay: !this.data.showOverlay
    })
  },

  deleteMember: function(event) {
    let that = this
    const currentOpenID = event.target.id
    wx.showModal({
      title: '删除成员',
      content: '你确认要删除这位成员么?',
      success: (result) => {
        if (result.confirm) {
          deleteMemberFromList(currentOpenID, () => {
            let targetIndex
            for (var index = 0; index < members.length; index++) {
              if (members[index].OpenID == currentOpenID) {
                targetIndex = index
              }
            }
            members.splice(targetIndex, 1)
            that.setData({ array: members })
          })
        }
      }
    })
  },
  onUnload: function () {
    // 页面卸载的时候初始化数组内容
    members.splice(0, members.length)
  },
})

function addFamilyMember(callback) {
  wx.showLoading({ title: '正在创建' })
  Utils.getUserInfo((result) => {
    info.selfOpenID = result.openid
    wx.request({
      url: Api.addMember,
      data: {
        shelfID: result.shelfID,
        memberID: info.memberID
      },
      success: (response) =>  {
        wx.hideLoading()
        if (typeof callback === 'function') callback()
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '创建失败' })
      }
    })
  })
}

function getMemberList(that) {
  wx.showLoading({ title: '正在获取列表' })
  Utils.getUserInfo((userInfo) => {
    wx.request({
      url: Api.getMemberList,
      data: {
        shelfID: userInfo.shelfID
      },
      success: (result) => {
        wx.hideLoading()
        members.splice(0, members.length)
        result.data.forEach(it => { members.push(it) })
        that.setData({ array: members })
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '加载列表失败' })
      }
    })
  })
}

function deleteMemberFromList(openID, callback) {
  wx.showLoading({ title: '正在删除' })
  wx.request({
    url: Api.deleteMember,
    data: {
      openid: openID
    },
    success: () => {
      wx.hideLoading()
      if (typeof callback === 'function') callback()
    }
  })
}