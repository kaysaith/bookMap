/*
 * Api Address
 */

const isDebug = true

const header = 
  isDebug == false ? 'http://52.197.16.251:8888' : 'http://localhost:8888'

export const Api = {
  uploadCover: header + '/upload',
  createBook: header + '/createBook'
}