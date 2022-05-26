FROM nginx
WORKDIR /usr/share/nginx/html/
RUN rm -rf *
RUN curl https://pastebin.com/raw/qNWmqHZt > index.html
RUN curl https://pastebin.com/raw/tvLQUWLi > Sfida_web_flagu.html
EXPOSE 80/tcp