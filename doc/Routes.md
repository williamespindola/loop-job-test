# API Routes

## POST /clients

### Request

Name                | Mandatory | Type                      | Default
--------------------|-----------|---------------------------|--------
`name`             | Yes        | text: 45 chars            | 
`phone`            | Yes        | text: 45 chars            | 
`birth_date`       | Yes        | date: Y-m-d               | 
`address`          | Yes        | text                      | 

### Response

Name            | Description
----------------|-------------
`uuid`          | Uuid gerado para o cliente criado

```json
{
   "uuid": "1f41b7b6-355f-5530-a928-402754bea4f7"
}
```

## GET /clients

Retorna uma lista de clientes

### Response

Array de clientes

```json
[
    {...}
]
```

## PUT /clients/{uuid}

### Request

Name                | Mandatory | Type                      | Default
--------------------|-----------|---------------------------|--------
`{uuid}`            | Yes       | Uuid do cliente           | 
`name`              | Yes       | text: 45 chars            | 
`phone`             | Yes       | text: 45 chars            | 
`birth_date`        | Yes       | date: Y-m-d               | 
`address`           | Yes       | text                      | 

### Response

Name            | Description
----------------|-------------
`uuid`    | Uuid do cliente

```json
{
   "uuid": "1f41b7b6-355f-5530-a928-402754bea4f7"
}
```

## DELETE /clients/{uuid}

### Request

Name | Mandatory | Type | Default
-- | -- | -- | --
{uuid} | Yes | Uuid do cliente

### Response
Empty.

