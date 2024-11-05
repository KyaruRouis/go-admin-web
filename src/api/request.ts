import axios,{AxiosRequestConfig,AxiosError} from 'axios'
import {useUserStore} from "@/store/modules/user";

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 100000,
    withCredentials: true
})

// request接口请求拦截
service.interceptors.request.use((config:AxiosRequestConfig)=> {
    const userStore = useUserStore()
    const token:string = userStore.token
    // 自定义请求头
    if (token){config.headers['AccessToken']=token}
    return config
},(error:AxiosError)=> {
    // 请求错误
    return Promise.reject(error)
})

export default service