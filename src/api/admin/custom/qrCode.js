import api from "@/libs/api.request";
const baseUrl = "/qr";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}
// 微信二维码获取
export const getQrCode = ({ sixiId, type }) => {
  return post("/code/create", {
    scene_str: {
      sixiId,
      type
    }
  });
};
