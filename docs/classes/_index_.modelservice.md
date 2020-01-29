[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [ModelService](_index_.modelservice.md)

# Class: ModelService

## Hierarchy

* [AbstractModelService](_index_.abstractmodelservice.md)

  ↳ **ModelService**

  ↳ [PostListModelService](_index_.postlistmodelservice.md)

## Implements

* [IModelService](../interfaces/_index_.imodelservice.md)

## Index

### Constructors

* [constructor](_index_.modelservice.md#constructor)

### Properties

* [model](_index_.modelservice.md#protected-model)

### Methods

* [delete](_index_.modelservice.md#delete)
* [get](_index_.modelservice.md#get)
* [patch](_index_.modelservice.md#patch)
* [post](_index_.modelservice.md#post)
* [put](_index_.modelservice.md#put)

## Constructors

###  constructor

\+ **new ModelService**(`model`: any): *[ModelService](_index_.modelservice.md)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |

**Returns:** *[ModelService](_index_.modelservice.md)*

## Properties

### `Protected` model

• **model**: *any*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:4

## Methods

###  delete

▸ **delete**(`__namedParameters`: object, `transaction?`: any): *Promise‹any›*

*Overrides [AbstractModelService](_index_.abstractmodelservice.md).[delete](_index_.abstractmodelservice.md#delete)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:9

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`params` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`query` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`session` | [ISession](../interfaces/_index_.isession.md) |

▪`Optional`  **transaction**: *any*

**Returns:** *Promise‹any›*

___

###  get

▸ **get**(`__namedParameters`: object, `transaction?`: any, `skipLocked?`: boolean): *Promise‹any›*

*Overrides [AbstractModelService](_index_.abstractmodelservice.md).[get](_index_.abstractmodelservice.md#get)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:6

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`params` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`query` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`session` | [ISession](../interfaces/_index_.isession.md) |

▪`Optional`  **transaction**: *any*

▪`Optional`  **skipLocked**: *boolean*

**Returns:** *Promise‹any›*

___

###  patch

▸ **patch**(`__namedParameters`: object, `transaction?`: any): *Promise‹any›*

*Overrides [AbstractModelService](_index_.abstractmodelservice.md).[patch](_index_.abstractmodelservice.md#patch)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:8

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`params` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`query` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`session` | [ISession](../interfaces/_index_.isession.md) |

▪`Optional`  **transaction**: *any*

**Returns:** *Promise‹any›*

___

###  post

▸ **post**(`__namedParameters`: object, `transaction?`: any): *Promise‹any›*

*Overrides [AbstractModelService](_index_.abstractmodelservice.md).[post](_index_.abstractmodelservice.md#post)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:7

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`body` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`params` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`query` | [ISimpleMap](../interfaces/_index_.isimplemap.md)‹any› |
`session` | [ISession](../interfaces/_index_.isession.md) |

▪`Optional`  **transaction**: *any*

**Returns:** *Promise‹any›*

___

###  put

▸ **put**(`options`: [IServiceArgs](../interfaces/_index_.iserviceargs.md)): *Promise‹any›*

*Inherited from [AbstractModelService](_index_.abstractmodelservice.md).[put](_index_.abstractmodelservice.md#put)*

Defined in node_modules/miqro-sequelize/dist/service/common/amodel.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IServiceArgs](../interfaces/_index_.iserviceargs.md) |

**Returns:** *Promise‹any›*
