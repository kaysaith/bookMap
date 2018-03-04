//index.js
//获取应用实例

import { Api } from '../../common/api'
import { Utils } from '../../common/component.js'

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

    showLoginView: false,
    isFamilyButton: false,
  },

  onLoad: function () {
    autoLoginIfNeed((status) => {
      if (status) {
        wx.getStorage({
          key: 'account',
          success: (res) => wx.redirectTo({ url: '../home/home' }),
          fail: () => this.setData({ showLoginView: true })
        })
      } else {
        this.setData({ showLoginView: true })
      }
    })
  },

  goToHomepage: (e) => {
    wx.removeStorage({ key: Utils.appKeyValue.currentShelfID })
    setAutoLoginStatus(true)
    loginOrRegister() 
  },

  goToFamilyDetail: () => { 
    setAutoLoginStatus(false)
    loginOrRegister({ isFamilyButton: true })
  }
})

function setAutoLoginStatus(needAutoLogin) {
  wx.setStorage({
    key: 'needRememberLoginStatus',
    data: needAutoLogin,
  })
}

function autoLoginIfNeed(callback) {
  wx.getStorage({
    key: 'needRememberLoginStatus',
    success: function(res) {
      if (typeof callback === 'function') callback(res.data)
    },
    fail: () => {
      if (typeof callback === 'function') callback(false)
    }
  })
}

function loginOrRegister(params = { isFamilyButton: Boolean }) {
  wx.showLoading({ title: '正在校验登录数据' })
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        getTokenAndUpdateUserInfo(res.code, () => {
           // 校验用户态完成后登录
          params.isFamilyButton === true 
            ? wx.navigateTo({ url: '../family/detail' })
            : wx.redirectTo({ url: '../home/home' })
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
        // result.data 返回的是 `openID`、`token` 、`userID` 和 'shelfID' 等
        if(setHasLogged(result.data)) {
          if (typeof callback === 'function') callback()
          wx.hideLoading()
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

function setHasLogged(account) {
  hasLogged = true
  wx.setStorage({
    key: 'account',
    data: account,
  })
  return hasLogged
}
