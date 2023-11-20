# 使用较新版本的 node 作为基础镜像
FROM node:16-alpine as build

# 设置工作目录。Docker 在这个目录下执行后续命令
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install --legacy-peer-deps

# 复制所有前端代码到工作目录
COPY . ./

# 构建应用
RUN npm run build

# 使用 nginx 镜像来部署 React 应用
FROM nginx:alpine

# 从构建阶段复制构建出来的文件到 nginx 目录
COPY --from=build /app/build /usr/share/nginx/html

# 复制自定义的Nginx配置文件到容器内
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口 80
EXPOSE 80

# 使用 nginx 的默认启动命令
CMD ["nginx", "-g", "daemon off;"]
