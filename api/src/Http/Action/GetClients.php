<?php

declare(strict_types=1);

namespace Loop\Client\Http\Action;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Loop\Client\Http\JsonResponse;

final class GetClients
{
	use JsonResponse;

    public function __invoke(Request $request, Response $response): Response
    {
		return $this->responseAsJson($response, ['foo' => 'bar'], 200);
    }
}
