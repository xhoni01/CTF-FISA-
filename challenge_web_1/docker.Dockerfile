FROM nginx
WORKDIR /usr/share/nginx/html/
RUN rm -rf *
RUN apt-get install curl -y
RUN curl https://raw.githubusercontent.com/xhoni01/CTF-FISA-/main/challenge_web_1/sfida_web.html > index.html
RUN curl https://raw.githubusercontent.com/xhoni01/CTF-FISA-/main/challenge_web_1/Sfida_web_flagu.html > Sfida_web_flagu.html
EXPOSE 80/tcp
