import { get, post } from '@/utils/request'

// 获取课程目录详情
export const getCourseCatalogList = params => get('/wx/api/course/getCourseCourseCatalogList', params)

// 获取课程详情
export const getCourseDetailInfo = params => get('/wx/api/course/getCourseDetailInfo', params)

// 获取视频地址
export const getVedioAddress = params => get('/wx/api/course/getVedioAddress', params)

// 分页查询课程信息
export const queryCourseInfoPage = params => post('/wx/api/course/queryCourseInfoPage', params)

// 分页查询学习中课程信息
export const getLearnList = params => post('/wx/api/learn/ing/list', params)

export const saveCoursePurchaseInfo = params => post('/wx/api/course/saveCoursePurchaseInfo', params)

// 分页查询学习中课程信息
export const getLearnFinishList = params => post('/wx/api/learn/finish/list', params)

// 购买课程
export const getCoursePurchaseOrder = params => post('/pay/order/getCoursePurchaseOrder?purchaseId='+params)

export const catalog = params => post('/wx/api/learn/course/catalog', params)
export const finishCatalog = params => post('/wx/api/learn/course/catalog/finish', params)
export const saveCatalog = params => post('/wx/api/learn/course/catalog/save', params)