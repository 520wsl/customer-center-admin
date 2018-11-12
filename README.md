# Nginx 配置
##### 启动nginx代理
```

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    # 客户中心 Page
    # F:/GIT/SiXiCustomerCenter/sixi-customer-center-ui
    server {
		listen		8081;
		server_name	172.30.34.114;
		location / {
			root	F:/GIT/SiXiCustomerCenter/sixi-customer-center-ui/dist;
			try_files $uri $uri/ /admin.html;
		}
		error_page   500 502 503 504  /50x.html;
		location = /50x.html {
			root   F:/GIT/SiXiCustomerCenter/sixi-customer-center-ui/dist;
		}
	}

    # 客户中心 APP
    # F:/GIT/SiXiCustomerCenter/sixi-customer-center-ui
    server {
		listen		8082;
		server_name	172.30.34.114;
		location / {
			root	F:/GIT/SiXiCustomerCenter/sixi-customer-center-ui/dist;
			try_files $uri $uri/ /app.html;
		}
		error_page   500 502 503 504  /50x.html;
		location = /50x.html {
			root   F:/GIT/SiXiCustomerCenter/sixi-customer-center-ui/dist;
		}
	}
}

```

# 图片 CDN \$CDN() 函数

> 用于图片 CDN 统一处理函数， 函数存放于 libs/tools 里，全局调用 无需导入

## - 使用方法

```html
<!-- html img标签 -->
<img :src="$CDN('/sixi_logo.png')" />
```

```html
<!-- html 背景图片 -->
<div
	class="company"
	:style="'background-image: url('+$CDN('/my_company_bg.png')+')'"
></div>
```

# 项目启动方法解析

> 目前项目分为：
>
> -   app 手机端界面
> -   admin 后台管理界面

##### 启动配置

> 启动前需修改 vue.config.js 文件 pages 配置 ,将对应 page filename 项 修改为 index.html

```json
// 启动app
{
	"pages": {
		"admin": {
			"entry": "src/admin/main.js",
			"template": "public/admin.html",
			"filename": "admin.html",
			"title": "admin",
			"chunks": ["chunk-vendors", "chunk-common", "admin"]
		},
		"app": {
			"entry": "src/app/main.js",
			"template": "public/app.html",
			"filename": "index.html",
			"title": "app",
			"chunks": ["chunk-vendors", "chunk-common", "app"]
		}
	}
}
```

##### 启动命令

```
npm run serve
```
