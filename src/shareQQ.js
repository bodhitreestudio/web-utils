/*
 * Config QQ Share
 * 
 * shareConfig:
 *
 *  {
 *    title: "",
 *    summary: "",
 *    pic: "",
 *    url: ""
 *  }
 */

import { getScript } from "./Utils"

export default function(shareConfig) {
  if ((/MQQBrowser/i).test(navigator.appVersion) || (/Mobile\/\S* QQ\/\S*/i).test(navigator.appVersion)) {
    getScript("http://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js", () => {
      setShareInfo({
        title: shareConfig.title,
        summary: shareConfig.desc,
        pic: shareConfig.imgUrl,
        url: shareConfig.link
      })
    })
  }
}

