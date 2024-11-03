import request from "@/api/request"

// 获取用户列表数据
export function getUserListApi(params:object) {
    return request({
        url: "user",
        method: "get",
        params
    })
}