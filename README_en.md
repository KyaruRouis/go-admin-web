如果你更喜欢中文版本的说明，请访问 [中文版](README.md).

# 1. Project Overview

## Project Name

This is a backend management system based on **Gin** and **Vue**, aimed at providing an efficient and simple management interface. It supports user permission management, data display, and other functionalities, making it suitable for small and medium-sized management systems.

## Project Demo

[Demo Link](http://47.112.126.7:5173/)
admin
admin

## Tech Stack

- Frontend: Vue 3 + TypeScript + Vite + Element UI
- Backend: Gin Framework (Go)
- Database: MySQL

# 2. Features

- Role Management: Add, modify, delete users, assign permissions, export roles
- Menu Management: Add menus, configure menu routes, and component paths
- User Management: Add, modify, delete users, assign roles, export users
- Log Management: Access logs, export logs

# 3. Installation & Usage

#### 3.1 Frontend

1. Clone the frontend code:

   ```
   git clone https://github.com/KyaruRouis/go-admin-web.git
   cd go-admin-web
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Build for production environment:

   ```bash
   npm run build
   ```

4. Upload the build files (typically located in the `dist/` folder) to the Nginx server directory. Assuming Nginx is already configured, here’s a simple Nginx configuration example:

   Nginx configuration (usually in `/etc/nginx/sites-available/default` or `/etc/nginx/nginx.conf`):

   ```bash
   server {
       listen 80;
       server_name yourdomain.com;
   
       root /path/to/your/project/dist;  # Modify to the path of your dist folder
       index index.html;
   
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

5. Restart Nginx service:

   ```bash
   systemctl restart nginx
   ```

6. Access the frontend page:

- Frontend Management System: `http://yourdomain.com:5173`

#### 3.2 Backend

1. Clone the project:

   ```bash
   git clone https://github.com/KyaruRouis/GinVueA.git
   cd GinVueA
   ```

2. Install dependencies:

   ```bash
   go mod tidy
   ```
   
3. Configure the database connection (modify `models/init.go`):

   ```bash
   # Database username, password, and database name
   ```

4. Configure the server port (modify `main.go`):

   ```bash
   r.Run(":8015") // Default port 8015
   ```

5. Start the server:

   ```
   go run main.go
   ```

#### 3.3 Access

- Backend API: `http://localhost:8015`
- Frontend Management System: `http://localhost:5173`

# 4. **Contributions**

PRs are welcome! If you find any bugs or have suggestions, feel free to open an issue.
