FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html
RUN echo 'Hyperiot on Docker Container =]'