FROM nginx
WORKDIR /usr/share/nginx/html/
RUN apt-get install curl -y
RUN rm -rf *
RUN curl https://raw.githubusercontent.com/orangetw/My-CTF-Web-Challenges/master/hitcon-ctf-2017/babyfirst-revenge/exploit.py > web2.py
RUN curl https://github.com/orangetw/My-CTF-Web-Challenges/blob/master/hitcon-ctf-2017/babyfirst-revenge/index.php > web2.php
EXPOSE 80/tcp