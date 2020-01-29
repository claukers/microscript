[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [ErrorResponse](_index_.errorresponse.md)

# Class: ErrorResponse

## Hierarchy

* [APIResponse](_index_.apiresponse.md)

  ↳ **ErrorResponse**

## Index

### Constructors

* [constructor](_index_.errorresponse.md#constructor)

### Properties

* [body](_index_.errorresponse.md#optional-body)
* [status](_index_.errorresponse.md#status)

### Methods

* [send](_index_.errorresponse.md#send)

## Constructors

###  constructor

\+ **new ErrorResponse**(`e`: Error): *[ErrorResponse](_index_.errorresponse.md)*

*Overrides [APIResponse](_index_.apiresponse.md).[constructor](_index_.apiresponse.md#constructor)*

Defined in node_modules/miqro-express/dist/route/response/error.d.ts:2

**Parameters:**

Name | Type |
------ | ------ |
`e` | Error |

**Returns:** *[ErrorResponse](_index_.errorresponse.md)*

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
