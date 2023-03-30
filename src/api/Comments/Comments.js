import request from "@/utils/request.js";

/**
 * 获取评论
 * @param params
 * @returns {AxiosPromise}
 */
export function select_comment_by_uid(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/comment/select_comment_by_uid",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}

/**
 * 删除评论
 * @param params
 * @returns {AxiosPromise}
 */
export function delete_comment(params) {
    return request({
        // closeLoading: true,
        // closeInterceptors: true,
        url: "/comment/delete_comment",
        method: "post",
        data: params //注意：如果是get请求请使用 params: params
    });
}

