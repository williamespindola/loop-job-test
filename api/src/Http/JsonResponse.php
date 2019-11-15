<?php

declare(strict_types=1);

namespace Loop\Client\Http;

use json_encode;
use Psr\Http\Message\ResponseInterface;

trait JsonResponse
{
    public function responseAsJson(ResponseInterface $response, array $data, int $status): ResponseInterface
    {
        $response->getBody()
                 ->write(json_encode($data));

        return $response->withStatus($status)
                        ->withHeader('Content-Type', 'application/json');
    }
}
