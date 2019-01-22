import api from "@/libs/api.request";

const baseUrl = "/work-order";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

function getRedirectUri() {
    return window.location.host + '/admin/login/sso'
}

export const ssoCode = ({code}) => {
    let redirectUri = getRedirectUri()
    return post("/code", {code, redirectUri});
};
export const ssoLogin = () => {
    let redirectUri = getRedirectUri()
    console.log(redirectUri)
    return '/api' + baseUrl + '/login?redirectUri=' + redirectUri
};

export const ssoLoginOut = () => {
    let redirectUri = getRedirectUri()
    return '/api' + baseUrl + '/loginout?redirectUri=' + redirectUri
};


