import { get, post } from '@/utils/request'

// 个人中心
// 首页banner
export const getMyPersonalInfo = params => get('/wx/api/personal/getMyPersonalInfo', params)

// 消息
// 消息中心
export const messageCenter = params => get('/wx/api/personal/messageCenter', params)

// 获取消息分页列表
export const getMessagePageByType = params => post('/wx/api/personal/getMessagePageByType', params)

// 获取消息详情并阅读消息
export const getMessageDetailAndRead = params => post('/wx/api/personal/getMessageDetailAndRead?id=' + params.id, params)

// 申请代理商
export const agentApply = params => post('/wx/api/personal/agentApply', params)

// 代理商申请状态
export const getAgentStatus = params => get('/wx/api/personal/getAgentApplyResult', params)

