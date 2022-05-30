FROM nginx
WORKDIR /usr/share/nginx/html/
RUN rm -rf *
RUN curl https://raw.githubusercontent.com/orangetw/My-CTF-Web-Challenges/master/hitcon-ctf-2019/buggy-net/Default.aspx > web2.aspx
EXPOSE 5000/tcp
