# 使用 Nginx 作为 Web 服务器
FROM nginx:alpine

# 复制 React build 目录到 Nginx 静态目录
COPY build /usr/share/nginx/html

# 暴露 Nginx 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
