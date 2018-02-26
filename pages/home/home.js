// pages/home/home.js

const covers = [
  'https://img3.doubanio.com/lpic/s29642615.jpg',
  'https://img3.doubanio.com/lpic/s27734425.jpg',
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
  "迷宫中的将军",
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
    showSearchResult: false,
    resultHeight: 0,
    scrollViewHeight: 0,
    showCreateButton: true,
    showCancelButton: false,
    showSettingsView: false
  },

  upper: function (e) {
    console.log('upper')
  },

  scroll: function() {
    console.log('scroll')
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
      resultList: item,
      scrollViewHeight: wx.getSystemInfoSync().windowHeight - 130,
      resultHeight: wx.getSystemInfoSync().windowHeight - 130
    })

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

  goToDetail: (event) => {
    let pageInfo = JSON.stringify(item[event.currentTarget.dataset.index])
    wx.navigateTo({
      url: '../detail/detail?pageInfo=' + pageInfo
    })
  },

  showSettings: function() {
    this.settings.switchSettings()
  },

  showEditor: function() {
    this.editor.switchOverlay()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得 `settings` 组件
    this.settings = this.selectComponent("#settings")
    this.editor = this.selectComponent("#editor")
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