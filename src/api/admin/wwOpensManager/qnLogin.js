import config from "@/config";
import api from "@/libs/api.request";
const baseUrl = config.qnLogin;

function post (url, params) {
  return api.post(baseUrl + url, params);
}

function get (url, params) {
  return api.get(baseUrl + url, params);
}
// 设置路径
export const wwOpensManagerLoginListSetpath = ({
  path
}) => {
  return post("/setpath", {
    path
  });
};
//登录千牛客户端
export const wwOpensManagerLoginListLogin = ({
  username, password, iv
}) => {
  return post("/login", {
    username, password, iv
  });
};
//登录列表
export const wwOpensManagerLoginListLoginList = () => {
  return get("/list");
};
//判断登录插件是否开启
export const wwOpensManagerLoginListLoginInfo = () => {
  return get("/info");
};

