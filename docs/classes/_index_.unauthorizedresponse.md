[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [UnAuthorizedResponse](_index_.unauthorizedresponse.md)

# Class: UnAuthorizedResponse

## Hierarchy

* [APIResponse](_index_.apiresponse.md)

  ↳ **UnAuthorizedResponse**

## Index

### Constructors

* [constructor](_index_.unauthorizedresponse.md#constructor)

### Properties

* [body](_index_.unauthorizedresponse.md#optional-body)
* [status](_index_.unauthorizedresponse.md#status)

### Methods

* [send](_index_.unauthorizedresponse.md#send)

## Constructors

###  constructor

\+ **new UnAuthorizedResponse**(`message`: string): *[UnAuthorizedResponse](_index_.unauthorizedresponse.md)*

*Overrides [APIResponse](_index_.apiresponse.md).[constructor](_index_.apiresponse.md#constructor)*

Defined in node_modules/miqro-express/dist/route/response/unauth.d.ts:2

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *[UnAuthorizedResponse](_index_.unauthorizedresponse.md)*

## Properties

### `Optional` body

• **body**? : *any*

*Inherited from [APIResponse](_index_.apiresponse.md).[body](_index_.apiresponse.md#optional-body)*

Defined in node_modules/miqro-express/dist/route/response/api.d.ts:3

___

###  status

• **status**: *number*

*Inherited from [APIResponse](_index_.apiresponse.md).[status](_index_.apiresponse.md#status)*

Defined in node_modules/miqro-express/dist/route/response/api.d.ts:4

## Methods

###  send

▸ **send**(`res`: Response): *Promise‹void›*

*Inherited from [APIResponse](_index_.apiresponse.md).[send](_index_.apiresponse.md#send)*

Defined in node_modules/miqro-express/dist/route/response/api.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`res` | Response |

**Returns:** *Promise‹void›*
