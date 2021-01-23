import { get, post } from '@/utils/request'

// 字典查询
export const serchByKeyGroup = params => get('/wx/oapi/baseinfo/findDictionarysByKeyGroup', {'keyGroup': params})

// 获取城市
export const listAllCitys = params => get('/wx/oapi/baseinfo/listAllCitys', params)

// 图片上传
export const getToken = params => post('/upload/getToken', params)
export const uploadToQiniu = params => post(process.env.VUE_APP_UPLOAD_URL, params)