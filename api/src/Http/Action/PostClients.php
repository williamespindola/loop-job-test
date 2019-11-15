<?php

declare(strict_types=1);

namespace Loop\Client\Http\Action;

use array_reverse;
use explode;
use Doctrine\DBAL\Driver\Connection;
use implode;
use microtime;
use Ramsey\Uuid\Uuid;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Respect\Validation\Exceptions\NestedValidationException;
use Respect\Validation\Validator as v;
use Slim\Exception\HttpBadRequestException;
use str_replace;
use Loop\Client\Http\JsonResponse;

final class PostClients
{
    use JsonResponse;

    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function __invoke(Request $request, Response $response): Response
    {
        $inputData = $request->getParsedBody();

        try {
            v::key('name', v::stringType()->notEmpty())
              ->key('birth_date', v::stringType()->notEmpty())
              ->key('phone', v::stringType()->notEmpty())
              ->key('address', v::stringType()->notEmpty())
              ->assert($inputData);
        } catch (NestedValidationException $exception) {
            throw new HttpBadRequestException($request, $exception->getFullMessage());
        }

        $uuid5 = Uuid::uuid5(Uuid::NAMESPACE_DNS, $inputData['name'] . microtime());

        try {
            $this->connection->insert('client', [
                'uuid' => $uuid5->toString(),
                'name' => $inputData['name'],
                'phone' => str_replace(['(', ')', '-', ' '], '', $inputData['phone']),
                'birth_date' => implode('-', array_reverse(explode('/', $inputData['birth_date']))),
                'address' => $inputData['address']
            ]);
        } catch (DBALException $exception) {
            throw new HttpBadRequestException($request, $exception->getMessage());
        }

        return $this->responseAsJson($response, ['uuid' => $uuid5->toString()], 200);
    }
}
