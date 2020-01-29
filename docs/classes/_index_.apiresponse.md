[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [APIResponse](_index_.apiresponse.md)

# Class: APIResponse

## Hierarchy

* **APIResponse**

  ↳ [ServiceResponse](_index_.serviceresponse.md)

  ↳ [BadRequestResponse](_index_.badrequestresponse.md)

  ↳ [NotFoundResponse](_index_.notfoundresponse.md)

  ↳ [ErrorResponse](_index_.errorresponse.md)

  ↳ [UnAuthorizedResponse](_index_.unauthorizedresponse.md)

  ↳ [ForbiddenResponse](_index_.forbiddenresponse.md)

## Index

### Constructors

* [constructor](_index_.apiresponse.md#constructor)

### Properties

* [body](_index_.apiresponse.md#optional-body)
* [status](_index_.apiresponse.md#status)

### Methods

* [send](_index_.apiresponse.md#send)

## Constructors

###  constructor

\+ **new APIResponse**(`body?`: any): *[APIResponse](_index_.apiresponse.md)*

Defined in node_modules/miqro-express/dist/route/response/api.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`body?` | any |

**Returns:** *[APIResponse](_index_.apiresponse.md)*

## Properties

### `Optional` body

• **body**? : *any*

Defined in node_modules/miqro-express/dist/route/response/api.d.ts:3

___

###  status

• **status**: *number*

Defined in node_modules/miqro-express/dist/route/response/api.d.ts:4

## Methods

###  send

▸ **send**(`res`: Response): *Promise‹void›*

Defined in node_modules/miqro-express/dist/route/response/api.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`res` | Response |

**Returns:** *Promise‹void›*
