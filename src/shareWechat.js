/** 
 * Config Wechat Share
 */
import { getScript, jsonp } from './Utils'

/*
 * shareConfig = {
 *   appId: String,
 *   title: String,
 *   comment: String,
 *   desc: String,
 *   link: String,
 *   pics: String,
 *   imgUrl: String,
 *   debug: Boolean,
 *   onError
 * }
 */
export default function (signServerUrl, parseSignResult, shareConfig) {
  if (!(/MicroMessenger/i).test(navigator.userAgent)) { return; }

  let wechatConfig = {
    appID: shareConfig.appId,
    timestamp: Date.parse(new Date()) / 1000,
    nonce: Math.ceil(Math.random() * Date.now() * 100000).toString(16),
    signature: ""
  };

  jsonp(
    signServerUrl + "?" +
      assembleQueryString({
        url: getSignatureUrl(),
        timestamp: wechatConfig.timestamp,
        nonce: wechatConfig.nonce,
        jsonp: "jsonp"
      }),

    null,

    (err, result) => {
      if (err) {
        console.error('wechat share init error =>')
        console.error(err)
      } else {
        wechatConfig.signature = parseSignResult(result);
        loadWeChatScript(wechatConfig, shareConfig);
      }
    }

  )

  function loadWeChatScript(wechatConfig, shareConfig) {
    getScript("http://res.wx.qq.com/open/js/jweixin-1.1.0.js", () => {
      wx && wechatInit(wechatConfig, shareConfig);
    })
  }

  function wechatInit(wechatConfig, shareConfig) {
    wx.config({
      debug: shareConfig.debug,

      appId: wechatConfig.appID,
      timestamp: wechatConfig.timestamp,
      nonceStr: wechatConfig.nonce,
      signature: wechatConfig.signature,
      jsApiList: ["showOptionMenu", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
    });

    wx.ready(function () {
      // 分享到朋友圈.
      wx.onMenuShareTimeline(shareConfig);

      // 分享给朋友.
      wx.onMenuShareAppMessage(shareConfig);

      // 分享到 QQ.
      wx.onMenuShareQQ(shareConfig);

      // 分享到腾讯微博.
      wx.onMenuShareWeibo(shareConfig);
    });

    wx.error(function(res) {
      console.error("wechat init error", res)
      shareConfig.onError && shareConfig.onError(res)
    })
  }

}

function assembleQueryString(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      //str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      str.push(p + "=" + obj[p])
    }
  return str.join("&")
}

