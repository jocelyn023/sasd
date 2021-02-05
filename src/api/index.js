import { get, post } from '@/utils/request'

// 首页banner
export const getBanner = params => get('/wx/api/index/advertisementList', params)

// banner详情
export const getBannerDetail = params => get('/wx/api/index/getAdvertisementDetail', params)

// 首页通知公告
export const getIndexNews = params => get('/wx/api/index/getIndexNews', params)

// 首页通知公告列表
export const getIndexNewsList = params => post('/wx/api/index/getNewsPageByType', params)

// 获取首页课程信息
export const getIndexCourseList = params => get('/wx/api/index/getIndexTopCourse', params)
