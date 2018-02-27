//index.js
//获取应用实例
const app = getApp()

let hasLogged = false

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
        if (res.data) wx.redirectTo({ url: '../home/home' })
        else this.setData({ showLoginView: true })
      },
      fail: () => this.setData({ showLoginView: true })
    })
  },

  goToHomepage: (e) => {
    if (hasLogged) wx.redirectTo({ url: '../home/home' })
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
          if (hasLogged) wx.redirectTo({ url: '../home/home' })
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
