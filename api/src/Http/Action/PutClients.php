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
use Slim\Exception\HttpNotFoundException;
use str_replace;
use Loop\Client\Http\JsonResponse;

final class PutClients
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

        $inputData = $request->getParsedBody();

        try {
            v::key('name', v::stringType()->notEmpty())
              ->key('birth_date', v::stringType()->notEmpty())
              ->key('phone', v::stringType()->notEmpty())
              ->key('address', v::stringType()->notEmpty())
              ->key('neighborhood', v::stringType()->notEmpty())
              ->key('city', v::stringType()->notEmpty())
              ->key('state', v::stringType()->notEmpty())
              ->key('zip', v::stringType()->notEmpty())
              ->assert($inputData);
        } catch (NestedValidationException $exception) {
            throw new HttpBadRequestException($request, $exception->getFullMessage());
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

        $client['name'] = $inputData['name'];
        $client['phone'] = str_replace(['(', ')', '-', ' '], '', $inputData['phone']);
        $client['birth_date'] = implode('-', array_reverse(explode('/', $inputData['birth_date'])));
        $client['address'] = $inputData['address'];
        $client['neighborhood'] = $inputData['neighborhood'];
        $client['city'] = $inputData['city'];
        $client['state'] = $inputData['state'];
        $client['zip'] = str_replace('-', '', $inputData['zip']);
        $client['complement'] = str_replace('-', '', $inputData['complement']);

        try {
            $this->connection->update('client', $client, ['uuid' => $uuid]);
        } catch (DBALException $exception) {
            throw new HttpBadRequestException($request, $exception->getMessage());
        }

        return $this->responseAsJson($response, ['uuid' => $uuid], 200);
    }
}
