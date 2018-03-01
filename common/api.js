/*
 * Api Address
 */

const isDebug = true

const header = 
  isDebug == false ? 'http://52.197.16.251:8888' : 'http://127.0.0.1:8888'

export const Api = {
  uploadCover: header + '/upload',
  createBook: header + '/createBook',
  getTokenAndUserInfo: header + '/getTokenAndUserInfo',
  getBooks: header + '/getBooks',
  addMember: header + '/addMember',
  getMemberList: header + '/getMemberList',
  deleteMember: header + '/deleteMember',
  modifyBookInfo: header + '/modifyBookInfo',
  updateTargetBookInfo: header + '/updateTargetBookInfo'
}