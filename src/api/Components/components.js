import request from "@/utils/request.js";

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