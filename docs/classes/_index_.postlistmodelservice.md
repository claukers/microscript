[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [PostListModelService](_index_.postlistmodelservice.md)

# Class: PostListModelService

## Hierarchy

  ↳ [ModelService](_index_.modelservice.md)

  ↳ **PostListModelService**

  ↳ [FakeDeleteModelService](_index_.fakedeletemodelservice.md)

## Implements

* [IModelService](../interfaces/_index_.imodelservice.md)

## Index

### Constructors

* [constructor](_index_.postlistmodelservice.md#constructor)

### Properties

* [model](_index_.postlistmodelservice.md#protected-model)

### Methods

* [delete](_index_.postlistmodelservice.md#delete)
* [get](_index_.postlistmodelservice.md#get)
* [patch](_index_.postlistmodelservice.md#patch)
* [post](_index_.postlistmodelservice.md#post)
* [put](_index_.postlistmodelservice.md#put)

## Constructors

###  constructor

\+ **new PostListModelService**(`model`: any): *[PostListModelService](_index_.postlistmodelservice.md)*

*Inherited from [ModelService](_index_.modelservice.md).[constructor](_index_.modelservice.md#constructor)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |

**Returns:** *[PostListModelService](_index_.postlistmodelservice.md)*

## Properties

### `Protected` model

• **model**: *any*

*Inherited from [ModelService](_index_.modelservice.md).[model](_index_.modelservice.md#protected-model)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:4

## Methods

###  delete

▸ **delete**(`__namedParameters`: object, `transaction?`: any): *Promise‹any›*

*Inherited from [ModelService](_index_.modelservice.md).[delete](_index_.modelservice.md#delete)*

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

*Inherited from [ModelService](_index_.modelservice.md).[get](_index_.modelservice.md#get)*

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

*Inherited from [ModelService](_index_.modelservice.md).[patch](_index_.modelservice.md#patch)*

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

▸ **post**(`args`: any, `transaction?`: any): *Promise‹any›*

*Overrides [ModelService](_index_.modelservice.md).[post](_index_.modelservice.md#post)*

Defined in node_modules/miqro-sequelize/dist/service/postlist.d.ts:3

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |
`transaction?` | any |

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
