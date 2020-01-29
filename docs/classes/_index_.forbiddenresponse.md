[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [ForbiddenResponse](_index_.forbiddenresponse.md)

# Class: ForbiddenResponse

## Hierarchy

* [APIResponse](_index_.apiresponse.md)

  ↳ **ForbiddenResponse**

## Index

### Constructors

* [constructor](_index_.forbiddenresponse.md#constructor)

### Properties

* [body](_index_.forbiddenresponse.md#optional-body)
* [status](_index_.forbiddenresponse.md#status)

### Methods

* [send](_index_.forbiddenresponse.md#send)

## Constructors

###  constructor

\+ **new ForbiddenResponse**(`message`: string): *[ForbiddenResponse](_index_.forbiddenresponse.md)*

*Overrides [APIResponse](_index_.apiresponse.md).[constructor](_index_.apiresponse.md#constructor)*

Defined in node_modules/miqro-express/dist/route/response/forbidden.d.ts:2

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *[ForbiddenResponse](_index_.forbiddenresponse.md)*

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
