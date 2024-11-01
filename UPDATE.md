# 前端项目搭建

## 项目创建

npm create vite@latest

输入项目名：go-admin-web

选择vue，选择TS

### 1.vue-router4安装和引入

npm install vue-router@4

### 2.pinia安装和引入

npm install pinia

npm install pinia-plugin-persistedstate

### 3.element plus安装和引入

npm install element-plus

### 4.安装Axios

npm install axios

### 5.安装svg插件

npm install vite-plugin-svg-icons -D

### 6.安装nprogress进度条插件

npm install nprogress --save

## 设置别名和多配置环境

vite.config.ts文件

根目录创建viteenv目录

## Layout布局

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

### Tabs 标签页布局功能实现

src/views/system/layout/新建tags目录，在tags目录中编写Index.vue组件

src/store/modules下编写tagsViews.ts文件

### 新增Tabs标签页功能实现

#### src/store/modules/tagsViews.ts

新增addVisitedView函数

新增addView函数

#### src/views/system/layout/tags/Index.vue

定义点击tabs标签事件tabClick函数

el-tabs标签修改

定义addTabs函数

修改样式

#### src/views/system/layout/header/TopBar.vue

引入/tags/Index.vue组件

### 关闭tabs标签功能实现

#### 关闭当前标签页

##### src/views/system/layout/tags/Index.vue

新增函数isActive判断是否删除当前标签页

新增tabs标签函数removeTab

##### src/store/modules/tagsViews.ts

新增函数delView

新增函数delVisitedView

#### 关闭其他标签页

##### src/views/system/layout/tags/components/MoreButton.vue

新增目录components

新增组件MoreButton.vue

新增布局

导入相关依赖

新增函数closeOtherTab

##### src/store/modules/tagsViews.ts

新增delOtherViews函数

##### src/views/system/layout/tags/Index.vue

引入tags/components/MoreButton.vue

#### 关闭所有标签页

##### src/views/system/layout/tags/components/MoreButton.vue

新增布局

新增函数closeAllTab

##### src/store/modules/tagsViews.ts

新增函数delAllViews

新增函数goHome

## 登录功能与退出功能

### 登录页面布局

#### src/views/system/login/Login.vue

##### system目录下新建login目录

##### Login.vue组件迁移至login目录

##### Login布局设计

### 登录表单组件布局

#### src/views/system/login/components/LoginForm.vue

##### login目录下新建components目录

##### LoginForm布局设计，相关依赖导入

##### 定义表单规则，定义表单数据对象

##### 新增密码显示与隐藏函数

### 登录样式设计

#### src/views/system/login/Login.vue

##### 导入LoginForm.vue并使用组件

##### 编写样式

#### src/views/system/login/components/LoginForm.vue

##### 编写样式

#### src/style.css

##### 修改样式

### 登录功能实现

#### src/store/modules/user.ts

##### 设置登录信息

#### src/api/system/login/login.ts

##### 实现登录接口

#### src/views/system/login/components/LoginForm.vue

##### 新增提交表单函数submitForm

### 退出功能实现

#### src/views/system/layout/header/TopBar.vue

##### 新增退出系统函数

#### router/index/ts

##### 设置白名单功能，未登录也可访问对应地址

##### 新增路由地址

##### 新增判断登录状态函数
