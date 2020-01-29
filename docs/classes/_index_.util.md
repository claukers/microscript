[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Util](_index_.util.md)

# Class: Util

## Hierarchy

* **Util**

## Index

### Properties

* [configLoaded](_index_.util.md#static-private-configloaded)
* [sha256](_index_.util.md#static-sha256)

### Methods

* [checkEnvVariables](_index_.util.md#static-checkenvvariables)
* [getLogger](_index_.util.md#static-getlogger)
* [loadConfig](_index_.util.md#static-loadconfig)
* [parseOptions](_index_.util.md#static-parseoptions)
* [setupInstanceEnv](_index_.util.md#static-setupinstanceenv)
* [setupSimpleEnv](_index_.util.md#static-setupsimpleenv)

## Properties

### `Static` `Private` configLoaded

▪ **configLoaded**: *any*

Defined in node_modules/miqro-core/dist/util/util.d.ts:24

___

### `Static` sha256

▪ **sha256**: *function*

Defined in node_modules/miqro-core/dist/util/util.d.ts:8

#### Type declaration:

▸ (`data`: any): *string*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

## Methods

### `Static` checkEnvVariables

▸ **checkEnvVariables**(`requiredEnvVariables`: string[]): *void*

Defined in node_modules/miqro-core/dist/util/util.d.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`requiredEnvVariables` | string[] |

**Returns:** *void*

___

### `Static` getLogger

▸ **getLogger**(`identifier`: string): *Logger*

Defined in node_modules/miqro-core/dist/util/util.d.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | string |

**Returns:** *Logger*

___

### `Static` loadConfig

▸ **loadConfig**(`initEnv?`: boolean): *void*

Defined in node_modules/miqro-core/dist/util/util.d.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`initEnv?` | boolean |

**Returns:** *void*

___

### `Static` parseOptions

▸ **parseOptions**(`argName`: any, `arg`: object, `optionsArray`: Array‹object›, `parserOption?`: IOPTIONPARSER): *object*

Defined in node_modules/miqro-core/dist/util/util.d.ts:13

**Parameters:**

Name | Type |
------ | ------ |
`argName` | any |
`arg` | object |
`optionsArray` | Array‹object› |
`parserOption?` | IOPTIONPARSER |

**Returns:** *object*

* \[ **name**: *string*\]: any

___

### `Static` setupInstanceEnv

▸ **setupInstanceEnv**(`serviceName`: string, `scriptPath`: string): *void*

Defined in node_modules/miqro-core/dist/util/util.d.ts:10

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |
`scriptPath` | string |

**Returns:** *void*

___

### `Static` setupSimpleEnv

▸ **setupSimpleEnv**(): *void*

Defined in node_modules/miqro-core/dist/util/util.d.ts:9

**Returns:** *void*
