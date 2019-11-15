<?php

declare(strict_types=1);

define('DB_HOST','0.0.0.0');
define('DB_NAME','sigchopp');
define('DB_USERNAME','user');
define('DB_PASSWORD','pass');
date_default_timezone_set('America/Sao_Paulo');

use Doctrine\DBAL\Driver\Connection;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Server\MiddlewareInterface;
use Slim\Factory\AppFactory;
use Loop\Client\Http\Action\GetClients;
use Loop\Client\Http\Action\PostClients;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->addRoutingMiddleware();

$app->add(new class implements MiddlewareInterface {
    public function process(Request $request, RequestHandler $handler): Response
    {
        $contentType = $request->getHeaderLine('Content-Type');

        if (strstr($contentType, 'application/json')) {
            $contents = json_decode(file_get_contents('php://input'), true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $request = $request->withParsedBody($contents);
            }
        }

        return $handler->handle($request);
    }
});

$config = new \Doctrine\DBAL\Configuration();

$connection = \Doctrine\DBAL\DriverManager::getConnection([
    'dbname' => DB_NAME,
    'user' => DB_USERNAME,
    'password' => DB_PASSWORD,
    'host' => DB_HOST,
    'driver' => 'pdo_mysql'
], $config);
$connection->getWrappedConnection()->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);

$app->post('/clients', new PostClients($connection));

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->run();
