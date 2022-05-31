FROM nginx
WORKDIR /usr/share/nginx/html/
RUN apt-get install curl -y
RUN rm -rf *
RUN curl https://raw.githubusercontent.com/xhoni01/CTF-FISA-/main/Fisa_web3/web3.html > web3.html
RUN curl https://raw.githubusercontent.com/xhoni01/CTF-FISA-/main/Fisa_web3/web3.css > web3.css
EXPOSE 9000/tcp
