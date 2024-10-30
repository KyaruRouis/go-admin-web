# 前端项目搭建

## 1.项目创建

npm create vite@latest

输入项目名：go-admin-web

选择vue，选择TS

## 2.vue-router4安装和引入

npm install vue-router@4

## 3.pinia安装和引入

npm install pinia

npm install pinia-plugin-persistedstate

## 4.element plus安装和引入

npm install element-plus

## 5.安装Axios

npm install axios

## 6.安装svg插件

npm install vite-plugin-svg-icons -D

## 7.安装nprogress进度条插件

npm install nprogress --save

## 8.设置别名和多配置环境

vite.config.ts文件

根目录创建viteenv目录

## 9. Layout布局

### 主页面布局

src/views/system目录下新建layout目录，在layout目录下新建Index.vue组件

添加背景图，layout目录下Index.vue

### 侧边栏布局

layout目录下创建aside目录，创建Index.vue组件，引入到layout的Index.vue组件中

src/store目录下新建modules目录，在此目录下新建menu.ts文件

src/api/system目录下新建一个名为menu的目录，并在此目录下新建一个名为menu.ts的文件

public目录下新建一个名为menu.json的文件，用于测试src/api/system目录下的menu.ts

src/views/system/layout/aside/Index.vue组件中，获取菜单数据

### 顶部导航栏组件布局

layout目录下新建header目录，创建TopBar.vue组件

把TopBar.vue组件引入到layout目录下的Index.vue组件汇总

在src/views/system目录下新建一个home目录，并新建一个Index.vue组件

修改scr/router/index.ts文件中的路由信息

### 生成动态路由

src/router/index.ts

### 侧边栏收缩和展开

src/store/modules目录下新建setting.ts文件

src/views/system/layout/header目录下新建CollapseIcon.vue组件

layout/aside目录下Index.vue组件，修改el-menu标签

编写计算属性isCollapse

CollapseIcon.vue组件导入到TopBar.vue

修改TopBar.vue

修改layout/aside目录下Index.vue组件，增加隐藏logo功能

修改layout下的Index.vue组件，去除左下方滚动条

## 面包屑和标签页

### 面包屑布局

src/views/system/layout/header/Hamburger.vue组件

Hamburger.vue组件导入到TopBar.vue中
