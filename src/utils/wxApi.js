import wx from 'weixin-js-sdk';
import { get, post } from '@/utils/request'
const getWxConfig = params => post('/wx/config/load', params)

const ShareImpl = function (option) {
  //option是分享的配置内容*/
  const url = window.location.href.split("#")[0];
  getWxConfig({ url: url }).then((response) => {
    wx.config({
      debug: false,
      appId: response.data.appId,
      timestamp: response.data.timestamp,
      nonceStr: response.data.nonceStr,
      signature: response.data.signature,
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
      ]
    });
  }).catch(error => {
    window.console.log(error);
  });
  wx.ready(function () {
    wx.updateAppMessageShareData({
      title: option.shareTitle,
      desc: option.shareDesc,
      link: option.shareUrl,
      imgUrl: option.shareImg
    });
    wx.updateTimelineShareData({
      title: option.shareTitle,
      desc: option.shareDesc,
      link: option.shareUrl,
      imgUrl: option.shareImg,
    });
  })
}

export {
  ShareImpl
}