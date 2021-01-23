import { get, post } from '@/utils/request'

// 获取课程目录详情
export const getCourseCatalogList = params => get('/wx/api/course/getCourseCourseCatalogList', params)

// 获取课程详情
export const getCourseDetailInfo = params => get('/wx/api/course/getCourseDetailInfo', params)

// 获取视频地址
export const getVedioAddress = params => get('/wx/api/course/getVedioAddress', params)

// 分页查询课程信息
export const queryCourseInfoPage = params => post('/wx/api/course/queryCourseInfoPage', params)

