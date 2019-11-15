<?php

declare(strict_types=1);

namespace Loop\Client\Http\Action;

use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class GetClientsTest extends TestCase
{
    public function testSuccess()
    {
        $responseMock = $this->getMockBuilder(Response::class)
                                 ->setMethods(['write'])
                                 ->getMock();

        $requestStub = $this->createMock(Request::class);

        $responseMock->method('write')->willReturn("{'foo':'bar'}");

        $jsonResponseMock = $this->getMockBuilder(JsonResponse::class)
                                 ->setMethods(['responseAsJson'])
                                 ->getMock();

        $jsonResponseMock->expects($this->any())
                         ->method('responseAsJson')
                         ->willReturn("{'foo':'bar'}");

        $this->assertInstanceOf((new GetClients)($requestStub, $responseMock));
    }
}
