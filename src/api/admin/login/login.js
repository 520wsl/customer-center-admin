import api from "@/libs/api.request";
const baseUrl = "/staff-service";
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
