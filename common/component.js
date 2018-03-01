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
    }, 2000)
  }

  static getUserInfo(hold) {
    wx.getStorage({
      key: 'account',
      success: function(res) {
        if (typeof hold === 'function') hold(res.data)
      },
      fail: () => {
        wx.removeStorage({
          key: 'account',
          success: function (res) {
            wx.redirectTo({ url: '../index/index' })
            wx.showModal({
              title: '登录信息过期',
              content: '本地存储的数据过期请重新登录'
            })
          }
        })
      }
    })
  }

  static getIndexOfArray(array, value) {
    let targetIndex
    for (var index = 0; index < array.length; index++) {
      if(array[index] == value) {
        targetIndex = index
      }
    }
    return targetIndex
  }

  static bookModel(data) {
    let tag = data.tag 
    if (typeof data.tag !== 'undefine') {
      tag = ''
    }
    return {
      src: data.Cover,
      name: data.Name,
      position: ' Row ' + data.Row + ' Column ' + data.ColumnIndex,
      row: data.Row,
      column: data.ColumnIndex,
      id: data.ID,
      tag: tag
    }
  }
}