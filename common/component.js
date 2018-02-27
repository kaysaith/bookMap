/*
 * @author kaysaith
 */

let retryTimes = 3
let isRetrying = false

export class Utils {
  static chooseImage(callback) {
    wx.chooseImage({
      success: function(response) {
        // 获取图片本地路径
        if (typeof callback === 'function')
          callback(response.tempFiles[0].path)
      },
    })
  }

  static retry(callback) {
    if (isRetrying) return
    let retry = setTimeout(() => {
      isRetrying = true
      retryTimes -= 1
      if (typeof callback === 'function') callback()
      if (retryTimes <= 0) {
        wx.showModal({
          title: '连接失败',
          content: '重试 3 次依旧失败请检查网络',
        })
        clearTimeout(retry)
        isRetrying = false
        retryTimes = 3
      }
      // 这个打印要长期保留, 出现网络问题需要随时定位到这里 by KaySaith
      console.log(retryTimes + 'retry')
    }, 3000)
  }
}