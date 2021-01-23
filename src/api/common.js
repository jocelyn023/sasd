import axios from 'axios'
import { get, post } from '@/utils/request'

// 字典查询
export const serchByKeyGroup = params => get('/wx/oapi/baseinfo/findDictionarysByKeyGroup', {'keyGroup': params})

// 获取城市
export const listAllCitys = params => get('/wx/oapi/baseinfo/listAllCitys', params)

// 图片上传
export const getToken = params => post('/upload/getToken', params)
/**
 * 上传文件到阿里云
 * @param url 阿里云文件上传地址
 * @param parameter 上传参数
 * @returns {AxiosPromise}
 */
export function uploadFileToQiniu(parameter, callback) {
  var formData = new FormData();
  formData.append("token", parameter.token);
  formData.append("key", parameter.key);
  formData.append("name", parameter.name);
  formData.append("file", parameter.file);
  return axios({
    url: 'http://upload.qiniu.com/',
    method: "post",
    timeout: 0,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
    onUploadProgress: function(event) {
      callback(event);
    }
  });
}