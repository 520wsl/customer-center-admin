# Nginx 配置

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
    # F:/GIT/SiXiCustomerCenter/customer-center-app
    server {
		listen		8081;
		server_name	172.30.34.114;
		location / {
			root	F:/GIT/SiXiCustomerCenter/customer-center-app/dist;
			try_files $uri $uri/ /viewPage.html;
		}
		error_page   500 502 503 504  /50x.html;
		location = /50x.html {
			root   F:/GIT/SiXiCustomerCenter/customer-center-app/dist;
		}
	}

    # 客户中心 APP
    # F:/GIT/SiXiCustomerCenter/customer-center-app
    server {
		listen		8082;
		server_name	172.30.34.114;
		location / {
			root	F:/GIT/SiXiCustomerCenter/customer-center-app/dist;
			try_files $uri $uri/ /viewApp.html;
		}
		error_page   500 502 503 504  /50x.html;
		location = /50x.html {
			root   F:/GIT/SiXiCustomerCenter/customer-center-app/dist;
		}
	}
}

```