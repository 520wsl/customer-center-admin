import api from "@/libs/api.request";

const baseUrl = "/work-order";

function post(url, params) {
    return api.post(baseUrl + url, params);
}

function get(url, params) {
    return api.get(baseUrl + url, params);
}

function getRedirectUri({pathname}) {
    return window.document.location.origin + pathname
}

export const ssoCode = ({code, clientId, pathname}) => {
    let redirectUri = getRedirectUri({pathname})
    return post("/code", {code, redirectUri, clientId});
};
export const ssoLogin = ({clientId, pathname}) => {
    let redirectUri = getRedirectUri({pathname})
    return '/api' + baseUrl + '/login?redirectUri=' + redirectUri + '&clientId=' + clientId
};

export const ssoLoginOut = ({clientId, pathname}) => {
    let redirectUri = getRedirectUri({pathname})
    return '/api' + baseUrl + '/loginout?redirectUri=' + redirectUri + '&clientId=' + clientId
};


