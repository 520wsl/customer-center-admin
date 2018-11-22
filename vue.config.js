const path = require("path");

const resolve = dir => {
	return path.join(__dirname, dir);
};

const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";

module.exports = {
	baseUrl: BASE_URL,
	// 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
	devServer: {
		proxy: {
			// "/api/work-order": {
			// 	// 卢坤鹏
			// 	// target: "http://172.30.34.241:8202/",
			// 	// 刘英楠
			// 	target: "http://172.30.34.109:8202/",
			// 	changeOrigin: true,
			// 	pathRewrite: {
			// 		"^/api/work-order": ""
			// 	}
			// },
			// "/api/evaluate": {
			// 	// target: "http://172.30.34.78:8201/",
			// 	// 刘英楠
			// 	target: "http://172.30.34.109:8202/",
			// 	changeOrigin: true,
			// 	pathRewrite: {
			// 		"^/api/evaluate": ""
			// 	}
			// },
			// "/api/customer": {
			// 	// target: "http://172.30.34.13:8080/",
			// 	// 刘英楠
			// 	target: "http://172.30.34.109:8202/",
			// 	changeOrigin: true,
			// 	pathRewrite: {
			// 		"^/api/customer": ""
			// 	}
			// },
			// "/api/qr": {
			// 	target: "https://qmr.n.yumc.pw/",
			// 	changeOrigin: true,
			// 	pathRewrite: {
			// 		"^/api/qr": "/qr"
			// 	}
			// },
			// "/api": {
			// 	target: "http://192.168.2.230:8090",
			// 	changeOrigin: true,
			// 	pathRewrite: {
			// 		"^/api": ""
			// 	}
			// }
			"/api": {
				target: "http://test.base.internal.sixi.com",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				}
			}
		},
		disableHostCheck: true
	},
	lintOnSave: true,
	chainWebpack: config => {
		config.resolve.alias
			.set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set("_c", resolve("src/components"))
			.set("_js", resolve("src/assets/js"));
	},
	// 打包时不生成.map文件
	productionSourceMap: false,
	pages: {
		admin: {
			entry: "src/admin/main.js",
			template: "public/admin.html",
			filename: "index.html",
			title: "admin",
			chunks: ["chunk-vendors", "chunk-common", "admin"]
		}
	}
};
