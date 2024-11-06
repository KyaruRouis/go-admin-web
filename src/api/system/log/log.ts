import request from "@/api/request";

// 获取日志列表数据
export function getLogListApi(params:object) {
    return request({
        url: 'log',
        method: 'get',
        params
    })
}