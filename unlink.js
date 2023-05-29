// ==UserScript==

// @name         去除安全中心
// @version      0.0.1
// @description  屏蔽安全中心，直接跳转链接地址。
// @match        https://*.zhihu.com/*
// @match        https://*.jianshu.com/*
// @match        https://*.ld246.com/*
// @match        https://*.juejin.cn/*
// @match        https://*.zhihu.com/*

// ==/UserScript==


(function () {

    /// 地址类型
    /// https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Falibaba%2Ffish-redux
    /// https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Falibaba%2Ffish-redux
    /// https://link.zhihu.com/?target=https%3A//www.royalapplications.com/ts/mac/features

    /// 获取所以a标签
    /// 循环判断 a 标签是否包含两个 http 字样
    /// 截取最后一个 http 内容, 并格式化
    /// 理论上支持所有网页
    /// 如需支持其他网页,请在头部新增你需要的网址
    /// 例如: @match        https://*.zhihu.com/*

    const getURLParameters = (url) => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => ((a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a), {});

    window.onload = function () {
        setTimeout(function () {
            getRightHref();
        }, 800);
    };

    /// 获取正确的地址用于跳转
    function getRightHref() {
        var documents = document.getElementsByTagName("a");
        for (var i = 0; i < documents.length; i++) {
            if (documents[i].href.split("http").length > 2) {
                documents[i].setAttribute("href", decodeURIComponent("http" + documents[i].href.split("http")[2]));
            }
        }

        if (location.host.includes("juejin.cn") || location.host.includes("zhihu.com")) {
            var {target} = getURLParameters(location.href);
            if (target) {
                var targetStr = decodeURIComponent(target);
                location.href = targetStr;
            }
        }
    }
})();
