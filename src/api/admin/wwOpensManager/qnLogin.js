import api from "@/libs/api.request";
const baseUrl = "http://127.0.0.1:2335";

function post (url, params) {
  return api.post(baseUrl + url, params);
}

function get (url, params) {
  return api.get(baseUrl + url, params);
}
// 设置路径
export const setpath = ({
  path
}) => {
  return post("/setpath", {
    path
  });
};
//登录千牛客户端
export const login = ({
  username, password
}) => {
  return post("/login", {
    username, password
  });
};
//登录列表
export const loginList = () => {
  return get("/list");
};
//关闭客户端
