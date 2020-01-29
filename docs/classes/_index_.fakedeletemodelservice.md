[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [FakeDeleteModelService](_index_.fakedeletemodelservice.md)

# Class: FakeDeleteModelService

## Hierarchy

  ↳ [PostListModelService](_index_.postlistmodelservice.md)

  ↳ **FakeDeleteModelService**

## Implements

* [IModelService](../interfaces/_index_.imodelservice.md)

## Index

### Constructors

* [constructor](_index_.fakedeletemodelservice.md#constructor)

### Properties

* [model](_index_.fakedeletemodelservice.md#protected-model)
* [modelIsDeletedAttribute](_index_.fakedeletemodelservice.md#protected-modelisdeletedattribute)

### Methods

* [delete](_index_.fakedeletemodelservice.md#delete)
* [get](_index_.fakedeletemodelservice.md#get)
* [patch](_index_.fakedeletemodelservice.md#patch)
* [post](_index_.fakedeletemodelservice.md#post)
* [put](_index_.fakedeletemodelservice.md#put)

## Constructors

###  constructor

\+ **new FakeDeleteModelService**(`model`: any): *[FakeDeleteModelService](_index_.fakedeletemodelservice.md)*

*Inherited from [ModelService](_index_.modelservice.md).[constructor](_index_.modelservice.md#constructor)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |

**Returns:** *[FakeDeleteModelService](_index_.fakedeletemodelservice.md)*

## Properties

### `Protected` model

• **model**: *any*

*Inherited from [ModelService](_index_.modelservice.md).[model](_index_.modelservice.md#protected-model)*

Defined in node_modules/miqro-sequelize/dist/service/model.d.ts:4

___

### `Protected` modelIsDeletedAttribute

• **modelIsDeletedAttribute**: *string*

Defined in node_modules/miqro-sequelize/dist/service/deleted.d.ts:3

## Methods

###  delete

▸ **delete**(`args`: any): *Promise‹any›*

*Overrides [ModelService](_index_.modelservice.md).[delete](_index_.modelservice.md#delete)*

Defined in node_modules/miqro-sequelize/dist/service/deleted.d.ts:5

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |

**Returns:** *Promise‹any›*

___

###  get

▸ **get**(`args`: any): *Promise‹any›*

*Overrides [ModelService](_index_.modelservice.md).[get](_index_.modelservice.md#get)*

Defined in node_modules/miqro-sequelize/dist/service/deleted.d.ts:4

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |

**Returns:** *Promise‹any›*

___

###  patch

▸ **patch**(`args`: any): *Promise‹any›*

*Overrides [ModelService](_index_.modelservice.md).[patch](_index_.modelservice.md#patch)*

Defined in node_modules/miqro-sequelize/dist/service/deleted.d.ts:6

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |

**Returns:** *Promise‹any›*

___

###  post

▸ **post**(`args`: any): *Promise‹any›*

*Overrides [PostListModelService](_index_.postlistmodelservice.md).[post](_index_.postlistmodelservice.md#post)*

Defined in node_modules/miqro-sequelize/dist/service/deleted.d.ts:7

**Parameters:**

Name | Type |
------ | ------ |
`args` | any |

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
