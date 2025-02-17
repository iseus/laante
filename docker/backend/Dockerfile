FROM composer:2 AS composer
FROM php:8.2-fpm AS base

RUN apt-get update && apt-get install -y libpq-dev
RUN docker-php-ext-install pdo pdo_pgsql

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/backend

EXPOSE 8000

FROM base AS dev

COPY ./entry.sh /entry.sh
CMD ["sh", "/entry.sh"]

FROM base AS prod

COPY . /var/www/backend
RUN composer install
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
