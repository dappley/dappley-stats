FROM debian

RUN apt-get update
RUN apt-get install -y nginx

COPY dist/ /var/www/html/
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]