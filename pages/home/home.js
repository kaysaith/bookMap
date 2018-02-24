// pages/home/home.js

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

  const data = []

Page({

  /**
   * 页面的初始数据
   */

  data: {
    showView: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    for (let index = 0; index < 10; index++) {
      data.push({ 
        src: covers[index] ,
        name: names[index]
      })
    }
    
    this.setData({
      array: data,
    })

    showView: (options.showView == "true" ? true : false) 
  },

  // 显示悬浮曾的开关
  showOverlay: function () {
    this.setData({
      showView: !this.data.showView
    })
    console.log('hello')
    console.log(this.data.showView)
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