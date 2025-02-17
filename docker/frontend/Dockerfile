FROM node:alpine

WORKDIR /var/www/frontend

RUN npm install -g @angular/cli@17

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
