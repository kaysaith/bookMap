//index.js
//获取应用实例
const app = getApp()

var hasLogged = false

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

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
        console.log(res.data)
        if (res.data === true) wx.navigateTo({ url: '../home/home' })
        else this.setData({ showLoginView: true })
      },
      complete: () => {
        if (!hasLogged) this.setData({ showLoginView: true })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  goToHomepage: (e) => {
    if (hasLogged) wx.navigateTo({ url: '../home/home' })
    else {
      wx.getUserInfo({
        success: res => {
          hasLogged = true
          wx.setStorage({
            key: 'logStatus',
            data: hasLogged,
          })
          app.globalData.userInfo = res.userInfo
        },
        complete: () => {
          if (hasLogged) wx.navigateTo({ url: '../home/home' })
        }
      })
    }
  },

  goToFamilyDetail: () => {
    wx.navigateTo({
      url: '../family/detail'
    })
  }
})
