# Loop Client

## Install

Instale as depdências

```shell
composer install
npm install
```

Em ambiente de desenvolvimento

Para subir a aplicação no frontend
```shell
npm run start
```

Você pode subir a api usando o servidor interno do php
```shell
php -S localhost:8080 -t api
```

Para configuração no servidor com Nginx você precisa de dois arquivos
e configuração um para a aplicação e outro para a api.

Configurando a aplicação
```nginx
server {
    server_name loopclient.williamespindola.dev;

    root /var/www/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html;

    charset utf-8;

    location / {
        try_files $uri $uri/ =404;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Configurando a api

```nginx
server {
    server_name loopclient.api.williamespindola.dev;

    root /var/www/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+);
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param SCRIPT_NAME $fastcgi_script_name;
        fastcgi_index index.php;
        fastcgi_pass 127.0.0.1:9000;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Crie um banco de dados usando o schema que esta em doc/loop_client.sql
e configure as credênciais em api/index.php

## Credits

- [William][link-author]

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[link-author]: https://github.com/williamespindola
