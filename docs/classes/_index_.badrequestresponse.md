[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [BadRequestResponse](_index_.badrequestresponse.md)

# Class: BadRequestResponse

## Hierarchy

* [APIResponse](_index_.apiresponse.md)

  ↳ **BadRequestResponse**

## Index

### Constructors

* [constructor](_index_.badrequestresponse.md#constructor)

### Properties

* [body](_index_.badrequestresponse.md#optional-body)
* [status](_index_.badrequestresponse.md#status)

### Methods

* [send](_index_.badrequestresponse.md#send)

## Constructors

###  constructor

\+ **new BadRequestResponse**(`message`: string): *[BadRequestResponse](_index_.badrequestresponse.md)*

*Overrides [APIResponse](_index_.apiresponse.md).[constructor](_index_.apiresponse.md#constructor)*

Defined in node_modules/miqro-express/dist/route/response/badrequest.d.ts:2

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *[BadRequestResponse](_index_.badrequestresponse.md)*

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
