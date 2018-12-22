import api from "@/libs/api.request";
const baseUrl = "/wechat-proxy";
function post(url, params) {
	return api.post(baseUrl + url, params);
}
function get(url, params) {
	return api.get(baseUrl + url, params);
}
// 微信二维码获取
export const getQRCodeUrl = ({ type, regId, sixiId }) => {
	return post("/qr/code/create", {
		scene_str: JSON.stringify({
			regId,
			type,
			sixiId
		})
	});
};
