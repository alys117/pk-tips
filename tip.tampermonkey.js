// ==UserScript==
// @name         my-monkey
// @namespace    http://tampermonkey.net/
// @version      1.0.13
// @description  try to take over the world!
// @author
// @updateURL    http://192.168.10.110:8088/tip.tampermonkey.js
// @downloadURL  http://192.168.10.110:8088/tip.tampermonkey.js
// @match        https://*/*
// @match        http://*/*
// @require      http://192.168.10.110:8088/tip.panke.js#sha256=a56a5b957e8f33e44112820cd988d961c044a4aa58f9bb9864d1d6c1fab02b3e
// @resource customCSS http://192.168.10.110:8088/tip.panke.css
// @grant        GM_addStyle
// @grant        GM_getResourceText

// ==/UserScript==
const css = GM_getResourceText("customCSS");
GM_addStyle(css);
(function() {
  console.log('version: 1.0.13')
})()
