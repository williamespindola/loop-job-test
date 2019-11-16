<?php

declare(strict_types=1);

namespace Loop\Client\Http\Action;

use Doctrine\DBAL\Driver\Connection;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\RequestException;
use json_decode;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpNotFoundException;
use Loop\Client\Http\JsonResponse;

final class SearchAddressClients
{
    use JsonResponse;

    private $connection;

    private $guzzleClient;

    public function __construct(Connection $connection, ClientInterface $guzzleClient)
    {
        $this->connection = $connection;
        $this->guzzleClient = $guzzleClient;
    }

    public function __invoke(Request $request, Response $response): Response
    {
        if (null === $cep = $request->getAttribute('cep')) {
            throw new HttpNotFoundException($request, 'CEP não encontrado');
        }

        try {
            $viaCepResponse = $this->guzzleClient->request('GET', '/ws/' . $cep . '/json');
        } catch (RequestException $exception) {
            throw new HttpNotFoundException($request, 'CEP não encontrado');
        }

        $data = json_decode((string) $viaCepResponse->getBody(), true);

        if ($viaCepResponse->getStatusCode() !== 200 || isset($data['erro'])) {
            throw new HttpNotFoundException($request, 'CEP não encontrado');
        }

        $data = [
            'address' => $data['logradouro'],
            'neighborhood' => $data['bairro'],
            'city' => $data['localidade'],
            'state' => $data['uf'],
            'zip' => $data['cep']
        ];

        return $this->responseAsJson($response, $data, 200);
    }
}
