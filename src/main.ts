import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// svg-icons 注册导入
import 'virtual:svg-icons-register'
import SvgIcon from './components/SvgIcon/Index.vue'
const app = createApp(App)
app.use(router)
app.use(pinia)
// 将图标进行全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('SvgIcon', SvgIcon)
app.use(ElementPlus)
app.mount('#app')