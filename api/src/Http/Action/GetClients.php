<?php

declare(strict_types=1);

namespace Loop\Client\Http\Action;

use Doctrine\DBAL\Driver\Connection;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Loop\Client\Http\JsonResponse;

final class GetClients
{
	use JsonResponse;

    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function __invoke(Request $request, Response $response): Response
    {
        $clientList = $this->connection
                        ->createQueryBuilder()
                        ->select('client.uuid, client.name, client.phone,
                        date_format(client.birth_date, "%d/%m/%Y")as birth_date, client.address')
                        ->from('client')
                        ->execute()
                        ->fetchAll();

		return $this->responseAsJson($response, $clientList, 200);
    }
}
