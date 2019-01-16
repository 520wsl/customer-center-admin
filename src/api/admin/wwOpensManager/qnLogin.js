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
  username, password
}) => {
  return post("/login", {
    username, password
  });
};
//登录列表
export const wwOpensManagerLoginListLoginList = () => {
  return get("/list");
};

