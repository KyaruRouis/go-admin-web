import { defineStore } from "pinia";
import {getMenuListApi} from "../../api/system/menu/menu.ts";

export const useMenuStore = defineStore({
    id: "menuState",
    state: ()=> ({
        register: false, //路由是否注册
        routers: [], // 路由数据
    }),
    getters: {},
    actions: {
        // 生成路由
        generateRouter: async function () {
            const {data} = await getMenuListApi()
            this.routers = data.result
            return data.result
        }
    },
    persist: true
})