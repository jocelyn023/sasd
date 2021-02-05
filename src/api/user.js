import { get, post } from '@/utils/request'

// 个人中心
// 个人信息
export const getMyPersonalInfo = params => get('/wx/api/personal/getMyPersonalInfo', params)

// 更新个人信息
export const updateMyPersonalInfo = params => post('/wx/api/personal/updateMyPersonalInfo', params)

// 消息
// 消息中心
export const messageCenter = params => get('/wx/api/personal/messageCenter', params)

// 获取消息分页列表
export const getMessagePageByType = params => post('/wx/api/personal/getMessagePageByType', params)

// 获取消息详情并阅读消息
export const getMessageDetailAndRead = params => post('/wx/api/personal/getMessageDetailAndRead?id=' + params.id, params)


// 代理商
// 申请代理商
export const agentApply = params => post('/wx/api/personal/agentApply', params)

// 代理商申请状态
export const getAgentStatus = params => get('/wx/api/personal/getAgentApplyResult', params)
// 获取我的渠道报表
export const getChannelTabList = params => post('/wx/api/personal/getCoursePurchaseReportPage', params)
// 生成代理商支付订单
export const createApplyOrder = params => post('/pay/order/getAgentDepositPayOrder?applyId=' + params)


// 我的钱包
// 账户余额
export const getMyMoney = params => get('/wx/api/personal/getUserIncomeCashoutTotal', params)

// 获取最近一次提现申请信息
export const getCashoutApplyInfo = params => get('/wx/api/personal/getLastCashoutApply', params)

// 提现申请
export const cashoutApply = params => post('/wx/api/personal/cashoutApply', params)

// 提现结果
export const cashoutResult = params => get('/wx/api/personal/getCashoutApplyResult', params)

// 收支总额
export const getUserIncomeCashoutTotal = params => get('/wx/api/personal/getUserIncomeCashoutTotal', params)

// 收支明细
export const getIncomeCashoutDetail = params => post('/wx/api/personal/getIncomeCashoutDetail', params)

//获取邮寄地址
export const getMyPostAddress = params => get('/wx/api/personal/getMyPostAddress', params)

//保存邮寄地址
export const saveMyPostAddress = params => post('/wx/api/personal/saveMyPostAddress', params)


// 订单
// 订单列表
export const getOrderList = params => post('/wx/api/personal/getCoursePurchaseOrderPage', params)


// 我的成绩
// 成绩列表
export const getScoreList = params => post('/wx/api/personal/getCourseScorePage', params)

// 我的证书
export const getCertificateList = params => get('/wx/api/personal/getMyCertificateList', params)
