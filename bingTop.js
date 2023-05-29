// ==UserScript==

// @name         必应返回顶部
// @version      0.0.1
// @description  打补丁-必应返回顶部
// @match        http*://*.bing.com/*
// @grant        none
// @license      MIT

// ==/UserScript==

(function () {
    'use strict';

    function disableScrollToTop() {
        window.scrollTo = function (x, y) {
            if (y !== 0) {
                window.scrollTo.originalFunc(x, y);
            }
        };
        window.scrollTo.originalFunc = window.scrollTo;
    }

    window.addEventListener('focus', disableScrollToTop);
})();