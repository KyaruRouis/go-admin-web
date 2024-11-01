import {defineStore} from "pinia";
export const useUserStore = defineStore({
    id: "userStore",
    state: ()=> {
        return {
            // 登录token
            token: '',
            // 登录用户信息
            userInfo: {
                avatar: '',
                nickname: '',
                sex: ''
            },
            // 角色
            roles: []
        }
    },
    getters: {},
    actions: {
        // 设置登录token
        setToken(token:string){
            this.token = token
        },
        // 设置登录用户的信息
        setUserInfo(userInfo:any){
            this.userInfo = userInfo
        },
        // 更新部分信息
        setUserPartInfo(userInfo:any){
            this.userInfo.avatar = userInfo.avatar
            this.userInfo.sex = userInfo.sex
            this.userInfo.nickname = userInfo.nickname
        }
    },
    persist: true
})