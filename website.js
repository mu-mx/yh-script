// ==UserScript==

// @name         界面美化
// @version      0.0.28
// @description  自定义的美化网页界面
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js
// @match        https://www.bilibili.com/*
// @match        https://cn.bing.com/*
// @match        https://live.bilibili.com/*
// @grant        GM_addStyle

// ==/UserScript==

(function () {
    "use strict";
    if (!$) {
        var $ = window.jQuery;
    }

    console.log("美化网页界面 -> :", document.domain);

    //   bilibili-宽屏模式
    function bilibiliSetWidth() {
        setTimeout(() => {
            const widthBtn = document.querySelector(".bpx-player-ctrl-wide");
            console.log("widthBtn -> :", widthBtn);

            if (widthBtn) {
                widthBtn.click();
            }

            if (document.querySelector(".bui-collapse-arrow-text")) {
                document.querySelector(".bui-collapse-arrow-text").click();
            }

            var video = document.querySelector("video");
            if (video) {
                video.volume = 1;
            }

            const loginWrap = document.querySelector(".is-bottom");
            if (loginWrap) {
                loginWrap.style.display = "none";
            }

            const ltrowWrap = document.querySelector(".login-tip");
            if (ltrowWrap) {
                ltrowWrap.style.display = "none";
            }
        }, 3000);
    }

    const windowDpmainTypes = {
        "www.bilibili.com": () => {
            bilibiliSetWidth();
        },

        "bilibili.com": () => {
            bilibiliSetWidth();
        },

        "live.bilibili.com": () => {
            GM_addStyle(`
            .side-bar-popup-cntr{bottom:5% !important;height:84% !important;}
            .section-content-cntr{height:556px !important;}
            .title-length-limit{max-width:unset !important;}
        `);
        },

        "cn.bing.com": () => {
            /*
              #b_content{padding:41px 0 20px 0;margin:0 auto;width:80%;}
              #b_results li {margin: 28px 0 2px;}
              .b_ans{display:none}
              */
            GM_addStyle(`
            #b_results{width:60%}
        `);

            document.querySelector(".b_logoArea").setAttribute("target", "");
        },
    };

    window.onload = () => {
        windowDpmainTypes[document.domain]();
    };
})();