//index.js
//获取应用实例

import { Api } from '../../common/api'

const app = getApp()
let hasLogged = false

const bookMapUserInfo = {
  nickName: '',
  avatarUrl: ''
}

Page({
  data: {
    imgUrls: [
      '../../sources/images/Bookshelf.jpg',
      '../../sources/images/shelftwo.jpg',
      '../../sources/images/shelfthree.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    showLoginView: false
  },

  onLoad: function () {
    wx.getStorage({
      key: 'logStatus',
      success: function(res) {
        wx.redirectTo({ url: '../home/home' })
      },
      fail: () => {
        this.setData({ showLoginView: true })
      }
    })
  },

  goToHomepage: (e) => {
    loginOrRegister() 
  },

  goToFamilyDetail: () => wx.navigateTo({ url: '../family/detail' })
})

function loginOrRegister() {
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        getTokenAndUpdateUserInfo(res.code, () => {
          // 校验用户态完成后登录
          wx.redirectTo({ url: '../home/home' })
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
}

function getTokenAndUpdateUserInfo(code, callback) {
  getUserInfo((info) => {
    wx.request({
      url: Api.getTokenAndUserInfo,
      data: { 
        code: code,
        nickName: info.nickName,
        avatarUrl: info.avatarUrl
      },
      success: (result) => {
        // result.data 返回的是 `openid` 和 `session_key`
        if(setHasLogged()) {
          if (typeof callback === 'function') callback()
        }
      }
    }) 
  }) 
}

function getUserInfo(callback) {
  wx.getUserInfo({
    success: res => {
      app.globalData.userInfo = res.userInfo
      bookMapUserInfo.avatarUrl = res.userInfo.avatarUrl
      bookMapUserInfo.nickName = res.userInfo.nickName
      if (typeof callback === 'function') callback(bookMapUserInfo)
    }
  })
}

function setHasLogged() {
  hasLogged = true
  wx.setStorage({
    key: 'logStatus',
    data: hasLogged,
  })
  return hasLogged
}
