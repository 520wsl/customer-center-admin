import api from "@/libs/api.request";
const baseUrl = "/work-order/staff";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}
export const getUserInfoData = () => {
	return post("/user/info");
};
