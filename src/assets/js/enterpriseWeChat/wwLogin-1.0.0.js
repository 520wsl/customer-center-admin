/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-22 13:15:09
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2018-11-22 13:16:25
 * @explanatory:  企业微信 -- 身份验证 -- 扫码授权登陆 -- 构造内嵌登录二维码（https://work.weixin.qq.com/api/doc#90000/90135/91019）
 *      在需要展示企业微信网页登录二维码的网站引入如下JS文件，（支持https）：http://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js
 */
!(function(a, b, c) {
	function d(c) {
		var d = b.createElement("iframe"),
			e =
				"https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=" +
				c.appid +
				"&agentid=" +
				c.agentid +
				"&redirect_uri=" +
				c.redirect_uri +
				"&state=" +
				c.state +
				"&login_type=jssdk";
		(e += c.style ? "&style=" + c.style : ""),
			(e += c.href ? "&href=" + c.href : ""),
			(d.src = e),
			(d.frameBorder = "0"),
			(d.allowTransparency = "true"),
			(d.scrolling = "no"),
			(d.width = "300px"),
			(d.height = "400px");
		var f = b.getElementById(c.id);
		(f.innerHTML = ""),
			f.appendChild(d),
			(d.onload = function() {
				d.contentWindow.postMessage &&
					a.addEventListener &&
					(a.addEventListener("message", function(b) {
						b.data &&
							b.origin.indexOf("work.weixin.qq.com") > -1 &&
							(a.location.href = b.data);
					}),
					d.contentWindow.postMessage("ask_usePostMessage", "*"));
			});
	}
	a.WwLogin = d;
})(window, document);
