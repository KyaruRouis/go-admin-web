import Nprogress from "@/config/nprogress.ts";
// 1、导入vue-router模块
import {createRouter,createWebHistory} from 'vue-router'
import {useMenuStore} from "../store/modules/menu.ts";
import {useUserStore} from "../store/modules/user.ts";

// 定义路由和组件的映射关系
const modules = import.meta.glob("../views/**/**.vue")

// // 2、定义一些路由地址，每一个都需要映射到一个组件
// const routes = [{
//         path: '/',
//         redirect: '/login',
//         name: 'Login',
//         meta: { title: '后台管理系统-登录' },
//         component: ()=> import('../views/system/login/Login.vue'),
//     },
//     {
//         path: '/login',
//         name: 'Login',
//         meta: { title: '后台管理系统-登录' },
//         component: ()=> import('../views/system/login/Login.vue'),
//     },
//     {
//         path: '/index',
//         name: 'Index',
//         component: ()=> import('@/views/system/layout/Index.vue'),
//         redirect: '/home',
//         children: [
//             {
//                 path: '/home',
//                 name: 'Home',
//                 meta:{title:'首页',icon:'House'},
//                 component: ()=> import('@/views/system/home/Index.vue'),
//             }
//         ]
//     }
// ]

// 2、定义一些路由地址，每个都需要映射到一个组件
const routes = [{
    path: '/',
    redirect: '/login',
    meta: { title: '后台管理系统-登录'},
    component: ()=> import('../views/system/login/Login.vue')
},
    {
        path: '/login',
        name: 'Login',
        meta: { title: '后台管理系统-登录'},
        component: ()=> import('../views/system/login/Login.vue')
    },
    {
        path: '/index',
        name: 'Index',
        component: ()=> import('@/views/system/layout/Index.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {title: '首页',icon:'House'},
                component: ()=> import('@/views/system/home/Index.vue')
            }
        ]

    }
]

// 3、创建路由实例并传递routes配置
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// 防止首次或者刷新界面路由失效
let registerRouteFresh = true


// 设置白名单
const whiteList = ['/login']

// 路由拦截守卫
router.beforeEach(async (to, from, next) => {
    // 1、NProgress开始
    Nprogress.start()

    // 如果是白名单的路径，直接放行
    const some = whiteList.some(function (item){
        return to.path.indexOf(item)!==-1
    })

    if(some){
        next()
    }else {
        // 判断是否已经登录
        const userStore = useUserStore()
        // 没有登录，跳转到登录页面
        if(userStore.token=='' || userStore.token==null){
            return next({path:`/login?redirect=${to.path}`, replace:true})
        }
    }

    //菜单信息
    const menuStore = useMenuStore()
    // 如果routers为空，获取菜单数据
    if (menuStore.routers==undefined || menuStore.routers.length == 0) {
        await menuStore.generateRouter()
    }
    // 生成动态路由start
    menuStore.routers.forEach(item=> {
        // 组装动态路由地址 start
        let myRoute:any = {}
        myRoute = {
            path: item.path,
            name: item.name,
            meta: {
                icon: item.web_icon,
                title:item.name
            },
            component: ()=> import("@/views/system/layout/Index.vue")
        }

        myRoute.children = []
        if(item.level ===1 && item.component_name.length!=0) {
            myRoute.children.push({
                path: item.path,
                name: item.name,
                meta: {
                    icon: item.web_icon,
                    title: item.name,
                },
                component: modules[`../views/${item.component_name}`]
            })
        }
        if (item.sub_menus){
            item.sub_menus.forEach((subItem:any)=>{
                if (subItem.path){
                    myRoute.children.push({
                        path: subItem.path,
                        name: subItem.name,
                        meta: {
                            icon: subItem.web_icon,
                            title: subItem.name,
                        },
                        component: modules[`../views/${subItem.component_name}`]
                    })
                }
            })
        }
        routes.push(myRoute)
        // 组装动态路由地址 end
    })
    if (registerRouteFresh){
        routes.forEach(item=>{
            router.addRoute(item)
        })
        next({...to,replace:true})
        registerRouteFresh = false
    }else {
        next()
    }
    // 生成动态路由end
    next()
})
// 路由跳转结束
router.afterEach(async (to, from, next) => {
    Nprogress.done()
})
// 路由跳转失败
router.onError(error => {
    Nprogress.done()
    console.warn("路由错误",error.message)
})

export default router