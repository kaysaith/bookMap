// common/settings/settings.js
Component({
  options: {
    multipleSlots: true 
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showSettingsView: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchSettings: function() {
      this.setData({
        showSettingsView: !this.data.showSettingsView
      })
    },

    goToFamilyMemberDetail: function() {
      wx.navigateTo({
        url: '../../pages/familyMember/detail',
      })
    },

    logOut: () => {
      wx.showModal({
        title: '登出',
        content: '你确认要退出登录么?',
        success: (response) => {
          if (response.confirm) {
            wx.removeStorage({
              key: 'logStatus',
              success: function (res) {
                wx.redirectTo({ url: '../index/index' })
              }
            })
          }
        }
      })
    },
  }
})
