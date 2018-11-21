import api from "@/libs/api.request";
const baseUrl = "/staff";
function post(url, params) {
  return api.post(baseUrl + url, params);
}
function get(url, params) {
  return api.get(baseUrl + url, params);
}

// PC端登录
export const sentLoginCodeData = ({ code }) => {
  return post("/user/code", {
    code
  });
};

// export const login = ({ userName, password, type }) => {
// 	const data = {
// 		username: userName,
// 		password,
// 		type
// 	};
// 	return api.post("/auth/login", data);
// };

export const getUserInfo = () => {
	return post("/user/info");
};

export const logout = () => {
	return post("/user/logout");
};
