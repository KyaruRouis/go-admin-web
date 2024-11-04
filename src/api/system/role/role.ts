import request from "@/api/request";

// 获取角色列表数据
export function getRoleListApi(params:object) {
    return request({
        url: 'role',
        method: 'get',
        params
    })
}

// 新建角色
export function addRoleApi(data:object) {
    return request({
        url: 'role',
        method: 'post',
        data
    })
}

// 根据ID获取角色信息
export function getRoleApi(id:number) {
    return request({
        url: `role/detail/${id}`,
        method: 'get'
    })
}

// 更新角色信息
export function editRoleApi(data:object) {
    return request({
        url: 'role',
        method: 'put',
        data
    })
}

// 删除角色信息
export function delRoleApi(id:number) {
    return request({
        url: `role/${id}`,
        method: 'delete'
    })
}

// 更改超管状态
export function updateIsAdminByIdApi(id:number,isAdmin:string) {
    return request({
        url: `role/${id}/${isAdmin}`,
        method:'patch'
    })
}