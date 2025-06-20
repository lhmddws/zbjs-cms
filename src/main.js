import './assets/global.css'

import { createApp } from 'vue'
import addpop from '@/components/pop/addpop.vue'
import edit from '@/components/pop/edit.vue'
import InboundRecordspop from '@/components/pop/InboundRecordspop.vue'
import OutboundRecordspop from '@/components/pop/OutboundRecordspop.vue'
//整体导入 ElementPlus 组件库
import ElementPlus from 'element-plus' //导入 ElementPlus 组件库的所有模块和功能 
import 'element-plus/dist/index.css' //导入 ElementPlus 组件库所需的全局 CSS 样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //导入 ElementPlus 组件库中的所有图标
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const app=createApp(App)
const pinia = createPinia()
app.use(pinia)
 //注册 ElementPlus 组件库中的所有图标到全局 Vue 应用中
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
app.use(router)
app.component('addpop',addpop)
app.component('edit',edit)
app.component('InboundRecordspop',InboundRecordspop)
app.component('OutboundRecordspop',OutboundRecordspop)
app.use(ElementPlus, { locale: zhCn }) //将 ElementPlus 插件注册到 Vue 应用中并使用中文语言包
app.mount('#app')
