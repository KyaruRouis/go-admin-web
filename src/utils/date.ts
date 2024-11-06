/**
 *
 * @param time 需要转换的时间
 * @param fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time:any,fmt:string){
    if (!time)return
    else {
        const date = new Date(time)
        const o = {
            'M+': date.getMonth() + 1,// getMonth()返回值是0（一月）到11（十二月）之间的整数
            'd+': date.getDate(),// getDate()返回1~31之间的整数
            'H+': date.getHours(),// getHours()返回对象的小时(0-23)
            'm+': date.getMinutes(),// getMinutes()返回的对象是分钟（0-59）
            's+': date.getSeconds(),// getSeconds()返回的对象是秒（0-59）
            'q+': Math.floor((date.getMonth() + 3) / 3),// 季度
            's': date.getMilliseconds()// 毫秒，返回的对象是（0-999）
        }

        //处理年份
        if (/(y+)/.test(fmt))fmt=fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        /**
         * RegExp.$1:指的是与正则表达式匹配的第一个子匹配（以括号为标志）的字符串
         * getFullYear(): 返回一个表示年份的4位数据
         * 输出的结果如:2023-MM-dd
         */
        //遍历o对象
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((
                    '00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt

    }
}

/**
 * 计算天数
 */
export function calculateDays(time:any) {
    if(!time)return
    else {
        let day = Math.floor(new Date().getTime()/1000)-(new Date(time).getTime()/1000)
        let day2 = Math.floor(day/(24*3600))
        return day2;
    }
}