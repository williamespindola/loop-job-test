<?php

declare(strict_types=1);

namespace Loop\Client\Http\Action;

use Doctrine\DBAL\Driver\Connection;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpNotFoundException;
use Loop\Client\Http\JsonResponse;

final class DeleteClients
{
    use JsonResponse;

    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function __invoke(Request $request, Response $response): Response
    {
        if (null === $uuid = $request->getAttribute('uuid')) {
            throw new HttpNotFoundException($request, 'Client not found');
        }

        $client = $this->connection
                       ->createQueryBuilder()
                       ->select('*')
                       ->from('client')
                       ->where('uuid = ?')
                       ->setParameters([$uuid])
                       ->execute()
                       ->fetch();

        if (!$client) {
            throw new HttpNotFoundException($request, 'Client not found');
        }

        try {
            $this->connection->delete('client', ['uuid' => $uuid]);
        } catch (DBALException $exception) {
            throw new HttpBadRequestException($request, $exception->getMessage());
        }

        return $this->responseAsJson($response, [], 200);
    }
}
