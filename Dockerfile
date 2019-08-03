FROM nginx:alpine
LABEL maintainer="研究院研发组 <research-maint@itcast.cn>"
COPY ./dist /usr/share/nginx/html
EXPOSE 80