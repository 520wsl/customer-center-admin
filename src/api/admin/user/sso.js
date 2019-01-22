import api from "@/libs/api.request";

const baseUrl = "/work-order";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

export const ssoCode = ({code}) => {
    return post("/code", {code});
};
export const ssoLogin = () => {
    return '/api' + baseUrl + '/login'
    // return post("/login");
};


