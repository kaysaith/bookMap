// pages/familyMember/detail.js

let members = [
  { name: 'Jeans Carry'},
  { name: 'Rong Xiao'},
  { name: 'James Blunt'}
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOverlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      array: members,
    })
  },

  addMember: function() {
    this.setData({
      showOverlay: !this.data.showOverlay
    })
  },

  confirm: function() {
    this.setData({
      showOverlay: !this.data.showOverlay
    })
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