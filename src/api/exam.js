import { post } from '@/utils/request'

// 保存地址
export const saveAddress = params => post('/wx/api/exam/address/save', params)

// 不换证调用
export const changeNoSave = params => post('/wx/api/exam/change/no/save', params)

// 换证调用
export const changeSave = params => post('/wx/api/exam/change/save', params)

// 获取考试信息
export const getExamInfo = params => post('/wx/api/exam/info', params)

// 保存考试基础信息
export const saveExamInfo = params => post('/wx/api/exam/info/save', params)

// 免费补考
export const makeUpFree = params => post('/wx/api/exam/makeUp/free', params)

// 参加考试
export const toExam = params => post('/wx/api/exam/toExam', params)

// 上传考试视频
export const saveVideo = params => post('/wx/api/exam/video/save', params)

// 完成笔试
export const saveWritten = params => post('/wx/api/exam/written/save', params)

export const getCertificateAddPayOrder = params => post('/pay/order/getCertificateAddPayOrder?purchaseId='+params)
export const getCourseMakeupExamOrder = params => post('/pay/order/getCourseMakeupExamOrder?purchaseId='+params)



