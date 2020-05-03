FROM nginx:1.18-alpine
WORKDIR /usr/share/nginx/html
COPY ${PWD}/build /usr/share/nginx/html/
RUN chown -R nginx:nginx **
EXPOSE 80
