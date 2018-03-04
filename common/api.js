/*
 * Api Address
 */

const isDebugMode = false

const header = !isDebugMode 
  ? 'https://bookmap.naonaola.com'
  : 'https://127.0.0.1:8888'

export const Api = {
  uploadCover: header + '/upload',
  createBook: header + '/createBook',
  getTokenAndUserInfo: header + '/getTokenAndUserInfo',
  getBooks: header + '/getBooks',
  addMember: header + '/addMember',
  getMemberList: header + '/getMemberList',
  deleteMember: header + '/deleteMember',
  modifyBookInfo: header + '/modifyBookInfo',
  updateTargetBookInfo: header + '/updateTargetBookInfo',
  searchBook: header + '/searchBook',
  deleteBook: header + '/deleteBook',
  getShelfList:  header + '/getShelfList',
  getShelfBooksCount: header + '/getShelfBooksCount'
} 