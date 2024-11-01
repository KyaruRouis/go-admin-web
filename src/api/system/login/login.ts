import request from "@/api/request"
// 登录系统
export function loginApi(data:object) {
    return request({
        url: '/login/password',
        method: 'post',
        data: data
    })
}