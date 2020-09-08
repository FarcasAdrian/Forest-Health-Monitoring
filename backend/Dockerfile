FROM alexcicioc/php:7.3-apache-composer-mysql

COPY apache-confs /etc/apache2/

RUN apt install -y libzip-dev libpng-dev

RUN docker-php-ext-install zip gd

WORKDIR /var/www/php

COPY ./composer.* ./

RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader

RUN composer update --prefer-dist --no-scripts --no-dev --no-autoloader

COPY . /var/www/php

RUN chown -R www-data:www-data /var/www/php

RUN composer dump-autoload --no-scripts --no-dev --optimize
