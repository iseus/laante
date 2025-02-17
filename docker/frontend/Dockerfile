FROM node:alpine AS base

RUN npm install -g @angular/cli@17

WORKDIR /var/www/frontend

EXPOSE 4200

FROM base AS dev

COPY ./entry.sh /entry.sh
CMD ["sh", "/entry.sh"]

FROM base AS prod

COPY . /var/www/frontend
RUN npm install
CMD ["ng", "serve", "--host", "0.0.0.0"]
