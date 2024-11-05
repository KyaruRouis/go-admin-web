import request from "@/api/request"
// 获取树形菜单列表
export function getMenuListApi(params?: object) {
    return request({
        //url: "http://127.0.0.1:5173/menu.json",
        url: "menu",
        method: "get",
        params,
    })
}

// 新增菜单
export function addMenuApi(data:object) {
    return request({
        url: 'menu',
        method: 'post',
        data
    })
}

// 更新菜单信息
export function editMenuApi(data:object) {
    return request({
        url: 'menu',
        method: 'put',
        data
    })
}

// 删除菜单信息
export function delMenuApi(id:number) {
    return request({
        url: `menu/${id}`,
        method: 'delete'
    })
}