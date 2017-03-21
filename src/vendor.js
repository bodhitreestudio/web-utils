/*
 *  Check platform.
 *  @ Return: "android" || "ios" || "wp" || "unknown"
 */

export function checkPlatform () {
  if (!navigator.userAgent || !navigator.platform) {
    return "unknown";
  }

  var result = "", ua = navigator.userAgent, platform = navigator.platform;

  // Windows Phone.
  if (/Windows Phone/i.test(ua)) {
    result = "wp";
  }

  // IOS.
  else if (/iPad|iPhone|iPod/.test(ua) && /iPad|iPhone|iPod/.test(platform)) {
    result = "ios";
  }

  // Android.
  else if (/Android/i.test(ua) && /Linux|Android/i.test(platform)) {
    result = "android";
  }

  return result;
}

export function isInWechat () {
  return /MicroMessenger|WeChat|We Chat|Weixin|Wei Xin/i.test(navigator.userAgent);
}

