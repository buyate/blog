import request from "@/utils/request.js";

/**
 * 修改密码
 * @param params
 * @returns {AxiosPromise}
 */
export function update_user(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/user/update_user",
        method: "get",
        params: params //注意：如果是get请求请使用 params: params
    });
}


/**
 * 查询名字
 * @param params
 * @returns {AxiosPromise}
 */
export function login_state(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/user/login_state",
        method: "get",
        params: params //注意：如果是get请求请使用 params: params
    });
}