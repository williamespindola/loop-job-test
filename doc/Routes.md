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