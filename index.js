import { openApp } from "./src/openApp"
import shareQQ from "./src/shareQQ"
import shareWechat from "./src/shareWechat"
import {
  getScript,
  jsonp,
  loadFonts
} from "./src/Utils"
import {
  checkPlatform,
  isInWechat
} from "./src/vendor"

module.exports = {
  openApp,
  shareQQ,
  shareWechat,
  // Utils
  getScript,
  jsonp,
  loadFonts,
  // Vendor
  checkPlatform,
  isInWechat
}

