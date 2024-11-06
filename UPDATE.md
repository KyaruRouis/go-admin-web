# 前端项目搭建

## 项目创建

npm create vite@latest

输入项目名：go-admin-web

选择vue，选择TS

### vue-router4安装和引入

npm install vue-router@4

### pinia安装和引入

npm install pinia

npm install pinia-plugin-persistedstate

### element plus安装和引入

npm install element-plus

### 安装Axios

npm install axios

### 安装svg插件

npm install vite-plugin-svg-icons -D

### 安装nprogress进度条插件

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

system目录下新建login目录

Login.vue组件迁移至login目录

Login布局设计

### 登录表单组件布局

#### src/views/system/login/components/LoginForm.vue

login目录下新建components目录

LoginForm布局设计，相关依赖导入

定义表单规则，定义表单数据对象

新增密码显示与隐藏函数

### 登录样式设计

#### src/views/system/login/Login.vue

导入LoginForm.vue并使用组件

编写样式

#### src/views/system/login/components/LoginForm.vue

编写样式

#### src/style.css

修改样式

### 登录功能实现

#### src/store/modules/user.ts

设置登录信息

#### src/api/system/login/login.ts

实现登录接口

#### src/views/system/login/components/LoginForm.vue

新增提交表单函数submitForm

### 退出功能实现

#### src/views/system/layout/header/TopBar.vue

新增退出系统函数

#### router/index/ts

设置白名单功能，未登录也可访问对应地址

新增路由地址

新增判断登录状态函数

## 管理员功能模块

### 管理员列表数据获取功能

#### 管理员页面组件布局

##### src/views/system/user/UserList.vue

新增user目录

新增UserList.vue组件

页面头部布局

页面表格布局

分页布局

##### src/main.ts

设置为中文

#### 管理员列表数据功能实现

##### src/views/system/user/UserList.vue

新增loadData函数

##### src/api/system/user/user.ts

新增user目录

新增user.ts文件

新增api接口获取用户列表数据

#### 时间格式化功能实现

##### src/utils/date.ts

新增utils目录

新增data.ts文件

##### src/views/system/user/UserList.vue

导入data.ts

#### 刷新和搜索管理员列表数据功能实现

##### src/views/system/user/UserList.vue

新增refresh函数

新增search函数

修改loadData函数查询参数

#### 列表数据分页和序号功能实现

##### src/views/system/user/UserList.vue

新增changepage函数

新增Nindex函数

### 添加管理员功能

#### src/views/system/user/components/AddUser.vue

新建components目录

新建AddUser.vue组件

##### 设计布局与样式

新增formUser表单数据对象

新增subLoading按钮状态变量

#### src/views/system/user/UserList.vue

导入src/views/system/user/components/AddUser.vue

使用AddUser.vue组件

设计样式

新增addUser函数

#### 添加管理员与取消添加管理员前端实现

##### src/views/system/user/components/AddUser.vue

新增addUser函数

##### src/api/system/user/user.ts

新增调用后端添加管理员信息接口函数

##### src/views/system/user/UserList.vue

新增closeAddUserForm函数

##### src/views/system/user/components/AddUser.vue

定义事件closeAddUserForm

新增关闭表单的close函数

#### 提交表单后关闭表格与刷新表格功能

##### src/views/system/user/UserList.vue

导入添加管理员信息组件

新增success函数

##### src/views/system/user/components/AddUser.vue

定义事件success

修改addUser函数

#### 校验表单输入

##### src/views/system/user/components/AddUser.vue

定义约束规则

定义表单实例

修改el-form标签

修改addUser函数

### 更新管理员功能

#### 更新管理员的页面布局

##### src/views/sytem/user/components/EditUser.vue

设计管理员页面布局

设计样式

定义formUser表单数据对象

定义按钮状态subLoading变量

引入父组件UserList.vue组件的userInfo对象

##### src/views/system/user/UserList.vue

导入EditUser.vue

新增editUser函数

##### src/api/system/user/user.ts

新增getUserApi函数

#### 更新管理员前端功能实现

##### src/views/sytem/user/components/EditUser.vue

新增editUser函数

##### src/api/system/user/user.ts

新增调用后端更新管理员信息的接口函数editUserApi

#### 管理员表单取消功能实现

##### src/views/system/user/UserList.vue

编辑用户组件

新增closeEditUserForm函数

##### src/views/sytem/user/components/EditUser.vue

定义事件

新增close函数

#### 提交表单后关闭更新管理员表单和刷新表格功能实现

##### src/views/system/user/UserList.vue

编辑用户组件

修改success函数

##### src/views/sytem/user/components/EditUser.vue

定义事件

新增editUser函数

#### 校验更新管理员表单功能实现

##### src/views/sytem/user/components/EditUser.vue

定义约束规则对象

定义表单实例对象

修改el-form标签

修改editUser函数

### 删除管理员功能

#### src/views/system/user/UserList.vue

新增delUser函数

#### src/api/system/user/usert.ts

新增delUserApi函数

### 导出管理员功能

#### src/utils/exportExcel.ts

新建导出excel工具文件exportExcel.ts

#### src/views/system/user/UserList.vue

定义导出列名的数组

新增函数exportExcelAction

## 角色模块功能

### 角色管理页面布局

#### 页面头部布局

##### src/views/system/role/RoleList.vue

新建role目录

新建RoleList.vue组件

设计头部布局

修改样式

##### src/api/system/role/role.ts 

新建role目录

新建role.ts组件

#### 页面表格布局

##### src/views/system/role/RoleList.vue

设计页面表格布局

#### 分页布局

##### src/views/system/role/RoleList.vue

设计分页布局

定义state对象

修改分页样式

### 角色列表数据获取功能

#### src/views/system/role/RoleList.vue

新增loadData的函数

#### src/api/system/role/role.ts

新增getRoleListApi函数

#### 刷新和搜索角色列表数据功能

##### src/views/system/role/RoleList.vue

新增refresh函数

新增search函数

修改loadData函数查询参数

#### 处理角色列表数据分页和序号功能实现

##### src/views/system/role/RoleList.vue

修改分页插件

新增changePage函数

新增Nindex函数

### 添加角色功能

#### 添加角色页面布局

##### src/views/system/role/compenents/AddRole.vue

新建components目录

新增AddRole.vue组件

设计布局与样式

定义formRole表单数据对象

定义subLoading按钮状态变量

##### src/views/system/role/RoleList.vue

导入AddRole.vue并使用

编写弹出框样式

新增addRole函数

#### 添加角色前端功能实现

##### src/views/system/role/compenents/AddRole.vue

新增addRole函数

##### src/api/system/role/role.ts

新增addRoleApi函数

#### 取消添加角色表单功能实现

##### src/views/system/role/RoleList.vue

导入添加角色组件

新增closeAddRoleForm函数

定义事件

新增close函数

#### 提交表单后关闭表单并刷新功能实现

##### src/views/system/role/RoleList.vue

使用添加角色组件

新增success的函数

##### src/views/system/role/compenents/AddRole.vue

定义事件

修改addRole的函数

#### 校验添加角色表单功能实现

##### src/views/system/role/compenents/AddRole.vue

定义约束规则对象

定义表单实例对象

修改el-form标签

修改addRole函数

### 更新角色功能

#### 页面布局

##### src/views/system/role/componets/EditRole.vue

新建EditRole.vue组件

设计布局与样式

定义formRole表单数据对象

定义按钮状态subLoading变量

获取父组件RoleList.vue组件传递的roleInfo对象并填充到表单数据formRole对象

##### src/views/system/role/RoleList.vue

导入EditRole.vue并使用

新增editRole函数

##### src/api/role/role.ts

新增getRoleApi函数

#### 功能实现

##### src/views/system/role/componets/EditRole.vue

新增editRole函数

##### src/api/system/role/role.ts

新增editRoleApi函数

#### 取消更新角色表单功能实现

##### src/views/system/role/RoleList.vue

编辑角色组件

新增closeEditRoleForm函数

##### src/views/system/role/componets/EditRole.vue

定义事件

新增close函数

#### 提交表单后关闭表单并刷新功能实现

##### src/views/system/role/RoleList.vue

编辑角色组件

修改success函数

##### src/views/system/role/componets/EditRole.vue

定义事件

修改editRole函数

#### 校验添加角色表单功能实现

##### src/views/system/role/componets/EditRole.vue

定义约束规则对象

定义表单实例对象

修改el-form标签

修改editRole函数

### 删除角色功能

#### src/views/system/role/RoleList.vue

新增delRole函数

#### src/api/system/role/role.ts

新增delRoleApi函数

### 导出角色功能

#### src/views/system/role/RoleList.vue

定义导出列名数组

定义导出函数exportExcelAction

### 修改角色管理员功能

#### src/views/system/role/RoleList.vue

修改组件代码

新增handleChangeAdminState函数

#### src/api/system/role/role.ts

新增updateIsAdminByIdApi函数

## 菜单模块功能

### 菜单管理页面布局

#### 页面头部布局 

##### src/views/system/menu/MenuList.vue

新建menu目录

新建MenuList.vue组件

设计头部布局和样式

设计页面表格布局

### 获取菜单列表数据功能

#### src/views/system/menu/MenuList.vue

定义一个state对象

新增loadData函数

#### src/api/system/menu/menu.ts

修改getMenuListApi函数

### 刷新菜单列表数据功能

#### src/views/system/menu/MenuList.vue

新增refresh函数

### 添加菜单页面功能

#### src/views/system/menu/components/AddMenu.vue

新建components目录

新建AddMenu.vue组件

设计布局与样式

定义formMenu表单数据对象

定义subLoading按钮状态变量

#### src/views/system/menu/MenuList.vue

导入AddMenu.vue组件

新增addMenu函数

#### 添加顶级菜单前端功能实现

##### src/views/system/menu/components/AddMenu.vue

新增addMenu的函数

##### src/api/system/menu/menu.ts

新增addMenuApi函数

### 取消新增菜单表单功能

#### src/views/system/menu/MenuList.vue

新增closeAddMenuForm函数

#### src/views/system/menu/components/AddMenu.vue

定义事件

新增close的函数

### 提交表单后关闭表单并刷新表格功能

#### src/views/system/menu/MenuList.vue

新增success函数

定义事件

#### src/views/system/menu/components/AddMenu.vue

修改addMenu函数

### 校验添加菜单表单功能

#### src/views/system/menu/components/AddMenu.vue

定义约束规则对象

定义表单实例对象，代码如下所示：

修改el-form标签

修改addMenu函数

### 选择图标页面布局功能

#### src/views/system/menu/components/Icon.vue

新建Icon.vue组件

设计布局

设计样式

定义图标数组

#### src/views/system/menu/components/AddMenu.vue

##### 导入Icon.vue组件并使用

定义图标弹出框状态

定义时间函数

### 选择图标前端功能

#### src/views/system/menu/components/Icon.vue

编写一个计算属性list

定义事件

编写选择图标函数

编写分页事件

### 添加子菜单功能

#### src/views/system/menu/MenuList.vue

新增addSubMenu

#### src/views/system/menu/components/AddMenu.vue

接收参数

修改表单数据对象

修改布局代码

### 更新菜单功能

#### 菜单页面的布局

##### src/views/system/menu/components/EditMenu.vue

设计布局和样式

定义formMenu表单数据对象

定义按钮状态subLoading变量

获取父组件MenuList.vue的menuInfo对象

menuInfo填充到表格数据对象formMenu

##### src/views/system/menu/MenuList.vue

导入EditMenu.vue并使用

新增editMenu函数

#### 更新菜单信息前端功能

##### src/views/system/menu/components/EditMenu.vue

新增editMenu函数

新增onChangeIcon函数

导入Icon.vue组件

##### src/api/system/menu/menu.ts

新增editMenuApi函数

#### 取消更新菜单信息表单功能

##### src/views/system/menu/MenuList.vue

新增closeEditMenuForm函数

##### src/views/system/menu/components/EditMenu.vue

定义事件

新增close函数

#### 提交表单后关闭更新菜单信息表单和刷新表格功能

##### src/views/system/menu/MenuList.vue

修改success函数

##### src/views/system/menu/components/EditMenu.vue

定义事件

修改editMenu函数

编写计算属性list

#### 校验更新菜单信息表单功能

##### src/views/system/menu/components/EditMenu.vue

定义约束规则对象

定义表单实例对象

修改el-form标签

修改editMenu函数

### 删除菜单信息功能

#### src/views/system/menu/MenuList.vue

新增delMenu函数

#### src/api/system/menu/menu.ts

新增delMenuApi函数

## 角色和菜单授权功能

### 添加用户时绑定角色功能

#### src/views/system/user/components/AddUser.vue

修改布局

修改表单数据对象

修改约束规则

新增getAllRoleList函数

#### src/api/system/user/user.ts

新增getAllRoleListApi函数

### 编辑用户时绑定角色

#### src/views/system/user/components/EditUser.vue

修改布局

修改表单数据对象formUser

修改约束规则对象rules

新增getAllRoleList函数

### 添加角色时绑定菜单功能

#### src/views/system/role/components/AddRole.vue

修改布局

修改表单数据对象

定义树形菜单实例对象

新增menuList的函数

定义菜单数据对象

修改addRole函数

### 编辑角色时分配菜单功能

#### src/views/system/role/components/EditRole.vue

修改布局代码

修改表单数据对象

定义树形菜单实例对象

新增menuList函数

修改editRole函数

### 根据登录用户的角色获取相应菜单功能

#### src/api/request.ts

修改文件

## 个人信息设置功能实现

### 基础设置

#### 个人设置组件页面

##### src/views/system/user/components/PersonalSettings.vue

新建PersonalSettings.vue组件

设计布局

定义基础信息对象

设计样式

#### 上传头像功能

##### src/views/system/user/components/PersonalSettings.vue

定义图标上传到服务器的路径变量

定义服务器路径对象

新增函数handleAvatarSuccess

修改el-upload标签

#### 设置TopBar.vue头像

修改用户头像布局

定义服务路径url

获取登录用户信息

### 设置基础信息功能

##### src/views/system/user/components/PersonalSettings.vue

导入FormRules和FormInstance对象

定义按钮状态loading

定义basicRules对象

新增函数onBasicSubmit

绑定提交按钮

获取登录用户信息并填充数据

##### src/api/system/user/user.ts

新增updateInfoApi函数

#### 修改TopBar.vue个人信息

##### src/views/system/layout/header/TopBar.vue

修改布局

##### utils/date.ts

新增calculateDays函数

### 绑定邮箱功能

#### 绑定邮箱页面布局

##### src/views/system/user/components/BindEmail.vue

新建BindEmail.vue组件

##### src/views/system/user/components/PersonalSettings.vue

#### 获取邮箱验证码功能

##### src/views/system/user/components/BindEmail.vue

定义state对象

编写获取邮箱的计算属性

新增函数getCode

##### src/api/system/user/user.ts

新增sendEmailApi函数

#### 校验旧邮箱验证码功能

##### src/views/system/user/components/BindEmail.vue

新增ConfirmCode函数

##### src/api/system/user/user.ts

新增verifyCodeApi函数

#### 更换新邮箱功能

##### src/views/system/user/components/BindEmail.vue

新增toBindSubmit函数

##### src/api/system/user/user.ts

新增updateEmailApi函数

### 更改个人密码功能

#### src/views/system/user/components/UpdatePwd.vue

新建UpdatePwd.vue组件

设计布局

定义表单数据对象modifyPwd

编写一个校验表单规则对象modifyRules

定义表单实例对象

定义提交表单按钮状态subLoading

新增函数modifySubmit

#### src/views/system/user/components/PersonalSettings.vue

导入并使用UpdatePwd.vue

#### src/api/system/user/usert.ts

新增updatePwdApi函数

### 个人详情信息功能

#### src/views/system/user/components/UserInfo.vue

新建UserInfo.vue组件

设计布局

#### src/views/system/user/components/PersonalSettings.vue

导入UserInfo.vue组件并使用

定义服务器路径变量url

获取登录用户信息

设计样式











