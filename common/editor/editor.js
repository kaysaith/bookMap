// common/editor/editor.js
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
    showView: false,
    hasUploaded: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示悬浮曾的开关
    switchOverlay: function () {
      this.setData({
        showView: !this.data.showView
      })

      // 悬浮曾关闭后恢复初始值
      if (this.data.showView === false) this.setData({ hasUploaded: false })
    },
    uploadCover: function () {
      Component.chooseImage(() => this.setData({ hasUploaded: true }))
    },
  }
})
