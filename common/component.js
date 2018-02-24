/*
 * @author kaysaith
 */

export class Component {
  static chooseImage(callback) {
    wx.chooseImage({
      success: function(response) {
        // 获取图片本地路径
        if (typeof callback === 'function')
          callback(response.tempFiles[0].path)
      },
    })
  }
}