import request from "@/api/request"

// 获取用户列表数据
export function getUserListApi(params:object) {
    return request({
        url: "user",
        method: "get",
        params
    })
}

// 新增管理员信息
export function addUserApi(data: object) {
    return request({
        url: 'user',
        method: 'post',
        data
    })
}

// 根据ID获取管理员信息
export function getUserApi(id:number) {
    return request({
        url: `user/detail/${id}`,
        method: 'get'
    })
}

// 更新管理员信息
export function editUserApi(data:object) {
    return request({
        url: 'user',
        method: 'put',
        data
    })
}

// 删除管理员信息
export function delUserApi(id:number) {
    return request({
        url: `user/${id}`,
        method: 'delete'
    })
}

// 获取所有角色列表数据
export function getAllRoleListApi() {
    return request({
        url: 'role/all',
        method: 'get'
    })
}