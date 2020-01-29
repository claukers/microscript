[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [IModelService](_index_.imodelservice.md)

# Interface: IModelService

## Hierarchy

* **IModelService**

## Implemented by

* [AbstractModelService](../classes/_index_.abstractmodelservice.md)
* [FakeDeleteModelService](../classes/_index_.fakedeletemodelservice.md)
* [ModelService](../classes/_index_.modelservice.md)
* [PostListModelService](../classes/_index_.postlistmodelservice.md)

## Index

### Methods

* [delete](_index_.imodelservice.md#delete)
* [get](_index_.imodelservice.md#get)
* [patch](_index_.imodelservice.md#patch)
* [post](_index_.imodelservice.md#post)
* [put](_index_.imodelservice.md#put)

## Methods

###  delete

▸ **delete**(`options`: [IServiceArgs](_index_.iserviceargs.md), `transaction?`: any): *Promise‹any›*

Defined in node_modules/miqro-sequelize/dist/service/common/model.d.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IServiceArgs](_index_.iserviceargs.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*

___

###  get

▸ **get**(`options`: [IServiceArgs](_index_.iserviceargs.md), `transaction?`: any, `skipLocked?`: boolean): *Promise‹any›*

Defined in node_modules/miqro-sequelize/dist/service/common/model.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IServiceArgs](_index_.iserviceargs.md) |
`transaction?` | any |
`skipLocked?` | boolean |

**Returns:** *Promise‹any›*

___

###  patch

▸ **patch**(`options`: [IServiceArgs](_index_.iserviceargs.md), `transaction?`: any): *Promise‹any›*

Defined in node_modules/miqro-sequelize/dist/service/common/model.d.ts:7

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IServiceArgs](_index_.iserviceargs.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*

___

###  post

▸ **post**(`options`: [IServiceArgs](_index_.iserviceargs.md), `transaction?`: any): *Promise‹any›*

Defined in node_modules/miqro-sequelize/dist/service/common/model.d.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IServiceArgs](_index_.iserviceargs.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*

___

###  put

▸ **put**(`options`: [IServiceArgs](_index_.iserviceargs.md), `transaction?`: any): *Promise‹any›*

Defined in node_modules/miqro-sequelize/dist/service/common/model.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IServiceArgs](_index_.iserviceargs.md) |
`transaction?` | any |

**Returns:** *Promise‹any›*
