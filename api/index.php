<?php

declare(strict_types=1);

define('DB_HOST','0.0.0.0');
define('DB_NAME','loop_client');
define('DB_USERNAME','user');
define('DB_PASSWORD','pass');
date_default_timezone_set('America/Sao_Paulo');

use Doctrine\DBAL\Driver\Connection;
use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Server\MiddlewareInterface;
use Slim\Factory\AppFactory;
use Loop\Client\Http\Action\GetClients;
use Loop\Client\Http\Action\PostClients;
use Loop\Client\Http\Action\PutClients;
use Loop\Client\Http\Action\DeleteClients;
use Loop\Client\Http\Action\SearchAddressClients;

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

$app->get('/clients', new GetClients($connection));
$app->get(
    '/search-address/{cep}',
    new SearchAddressClients($connection, new Client(['base_uri' => 'https://viacep.com.br']))
);
$app->post('/clients', new PostClients($connection));
$app->put('/clients/{uuid}', new PutClients($connection));
$app->delete('/clients/{uuid}', new DeleteClients($connection));

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$customErrorHandler = function (
    Request $request,
    Throwable $exception,
    bool $displayErrorDetails,
    bool $logErrors,
    bool $logErrorDetails
) use ($app) {
$payload = ['error' => $exception->getMessage()];
$response = $app->getResponseFactory()->createResponse();
$response->getBody()
         ->write(json_encode($payload, JSON_UNESCAPED_UNICODE));
return $response->withStatus($exception->getCode())
                ->withHeader('Content-Type', 'application/json');
};

$errorMiddleware->setDefaultErrorHandler($customErrorHandler);

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->run();
