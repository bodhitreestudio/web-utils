
import { checkPlatform, isInWechat } from "./vendor"

/**
 * Open native app:
 */
function openApp(configs) {
  const { appUri, appDownloadUri, appTencentStoreUri, appItunesStoreUri, appMsStoreUri, appPlayStoreUri } = configs
  let platform = checkPlatform()
  let inWeChat = isInWechat()

  let targetLink = appUri

  /** 1. Try to open app */
  if (inWeChat) {
    targetLink = appTencentStoreUri
  }
  let startTime = Date.now()
  navigateTo(targetLink)

  /** 2. If open failed then goto download page */
  setTimeout(function () {
    var deltaTime = Date.now() - startTime;
    if (deltaTime < 850) {
      navigateTo(appDownloadUri)
    }
  }, 800)
}

function navigateTo(url) {
  if (!/^http.*/.test(url)) {
    url = "http://" + url
  }
  location.href = url;
}

export default {
  openApp
}

