import api from "@/libs/api.request";
const baseUrl = "/qywechat-proxy-service";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}

// 企业微信PC端登录
export const sentLoginCodeData = ({ code }) => {
  return post("/user/code", {
    code
  });
};

export const logout = () => {
	return post("/user/logout");
};
