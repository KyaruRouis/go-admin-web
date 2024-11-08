If you prefer the English version, please visit [English version](README_en.md)。

# 1.项目简介

## 项目名称

这是一个基于 **Gin** 和 **Vue** 的后台管理系统，旨在提供高效、简洁的管理界面，支持用户权限管理、数据展示等功能，适用于中小型管理系统。

## 项目演示

[Demo演示地址](http://47.112.126.7:5173/)
admin
admin

## 技术栈

- 前端：Vue 3 + TypeScript +Vite + Element UI
- 后端：Gin框架（Go语言）
- 数据库：MySQL

# 2.功能特性

- 角色管理：新增、修改、删除用户，权限分配，导出角色
- 菜单管理：添加菜单、配置菜单的路由路径、组件路径
- 用户管理：新增、修改、删除用户，分配角色，导出用户
- 日志记录：访问记录，日志导出

# 3.安装与使用

#### 3.1前端

1. 克隆前端代码：

   ```
   git clone https://github.com/KyaruRouis/go-admin-web.git
   cd go-admin-web
   ```

2. 安装依赖：

   ```
   npm install
   ```

3. 进行生产环境打包：

   ```bash
   npm run build
   ```

4. 将打包后的文件（通常位于 `dist/` 文件夹中）上传至服务器的 Nginx 服务目录。假设你已经配置好 Nginx，以下是一个简单的 Nginx 配置示例：

   Nginx 配置（通常在 `/etc/nginx/sites-available/default` 或 `/etc/nginx/nginx.conf` 中）：

   ```bash
   nginx复制代码server {
       listen 80;
       server_name yourdomain.com;
   
       root /path/to/your/project/dist;  # 修改为你的 dist 文件夹路径
       index index.html;
   
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

5. 重启Nginx服务

   ```bash
   systemctl restart nginx
   ```

6. 访问前端页面

- 前端管理系统：`http://yourdomain.com:5173`

#### 3.2后端

1. 克隆项目：

   ```bash
   git clone https://github.com/KyaruRouis/GinVueA.git
   cd GinVueA
   ```

2. 安装依赖：

   ```bash
   go mod tidy
   ```
   
3. 配置数据库连接（修改 `models/init.go`）：

   ```bash
   数据库用户名、密码
   数据库名称等
   ```

4. 配置服务端口（修改 `main.go`）：

   ```bash
   r.Run(":8015") //默认8015端口运行
   ```

5. 启动服务：

   ```
   复制代码
   go run main.go
   ```

#### 3.3访问

- 后端 API：`http://localhost:8015`
- 前端管理系统：`http://localhost:5173`

# 4. **贡献**

欢迎提交 PR！如果你发现 bug 或有任何建议，欢迎提 issue。



