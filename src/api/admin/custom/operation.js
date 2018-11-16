import api from "@/libs/api.request";
const baseUrl = "/customer";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}
// 微信解绑
export const setWechatUntied = ({ openId }) => {
  return post("/wechat/untied", {
    openId
  });
};
