[miqro](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Database](_index_.database.md)

# Class: Database

## Hierarchy

* EventEmitter

  ↳ **Database**

## Index

### Constructors

* [constructor](_index_.database.md#constructor)

### Properties

* [models](_index_.database.md#models)
* [sequelize](_index_.database.md#sequelize)
* [state](_index_.database.md#private-state)
* [stateChange](_index_.database.md#private-statechange)
* [defaultMaxListeners](_index_.database.md#static-defaultmaxlisteners)
* [events](_index_.database.md#static-events)
* [instance](_index_.database.md#static-private-instance)

### Methods

* [addListener](_index_.database.md#addlistener)
* [emit](_index_.database.md#emit)
* [eventNames](_index_.database.md#eventnames)
* [getMaxListeners](_index_.database.md#getmaxlisteners)
* [listenerCount](_index_.database.md#listenercount)
* [listeners](_index_.database.md#listeners)
* [off](_index_.database.md#off)
* [on](_index_.database.md#on)
* [once](_index_.database.md#once)
* [prependListener](_index_.database.md#prependlistener)
* [prependOnceListener](_index_.database.md#prependoncelistener)
* [query](_index_.database.md#query)
* [rawListeners](_index_.database.md#rawlisteners)
* [removeAllListeners](_index_.database.md#removealllisteners)
* [removeListener](_index_.database.md#removelistener)
* [setMaxListeners](_index_.database.md#setmaxlisteners)
* [start](_index_.database.md#start)
* [stop](_index_.database.md#stop)
* [transaction](_index_.database.md#transaction)
* [getInstance](_index_.database.md#static-getinstance)
* [listenerCount](_index_.database.md#static-listenercount)

## Constructors

###  constructor

\+ **new Database**(): *[Database](_index_.database.md)*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:14

**Returns:** *[Database](_index_.database.md)*

## Properties

###  models

• **models**: *IModelMap*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:12

___

###  sequelize

• **sequelize**: *Sequelize*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:13

___

### `Private` state

• **state**: *any*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:14

___

### `Private` stateChange

• **stateChange**: *any*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:23

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [Database](_index_.database.md).[defaultMaxListeners](_index_.database.md#static-defaultmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:19

___

### `Static` events

▪ **events**: *DataBaseState[]*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:9

___

### `Static` `Private` instance

▪ **instance**: *any*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:11

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Database](_index_.database.md).[addListener](_index_.database.md#addlistener)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:21

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from [Database](_index_.database.md).[emit](_index_.database.md#emit)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [Database](_index_.database.md).[eventNames](_index_.database.md#eventnames)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:34

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [Database](_index_.database.md).[getMaxListeners](_index_.database.md#getmaxlisteners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:30

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [Database](_index_.database.md).[listenerCount](_index_.database.md#static-listenercount)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [Database](_index_.database.md).[listeners](_index_.database.md#listeners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Database](_index_.database.md).[off](_index_.database.md#off)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:27

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Database](_index_.database.md).[on](_index_.database.md#on)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:22

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Database](_index_.database.md).[once](_index_.database.md#once)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:23

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Database](_index_.database.md).[prependListener](_index_.database.md#prependlistener)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:24

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Database](_index_.database.md).[prependOnceListener](_index_.database.md#prependoncelistener)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:25

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  query

▸ **query**(`q`: object, `t?`: any): *Promise‹any›*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:17

**Parameters:**

▪ **q**: *object*

Name | Type |
------ | ------ |
`query` | string |
`values` | any[] |

▪`Optional`  **t**: *any*

**Returns:** *Promise‹any›*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from [Database](_index_.database.md).[rawListeners](_index_.database.md#rawlisteners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:32

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [Database](_index_.database.md).[removeAllListeners](_index_.database.md#removealllisteners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Database](_index_.database.md).[removeListener](_index_.database.md#removelistener)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:26

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from [Database](_index_.database.md).[setMaxListeners](_index_.database.md#setmaxlisteners)*

*Overrides void*

Defined in node_modules/@types/node/events.d.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  start

▸ **start**(): *Promise‹void›*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:21

**Returns:** *Promise‹void›*

___

###  stop

▸ **stop**(): *Promise‹void›*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:22

**Returns:** *Promise‹void›*

___

###  transaction

▸ **transaction**(`transactionCB`: function): *Promise‹void›*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:16

**Parameters:**

▪ **transactionCB**: *function*

▸ (`t`: Transaction): *PromiseLike‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`t` | Transaction |

**Returns:** *Promise‹void›*

___

### `Static` getInstance

▸ **getInstance**(): *[Database](_index_.database.md)*

Defined in node_modules/miqro-sequelize/dist/db/db.d.ts:10

**Returns:** *[Database](_index_.database.md)*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from [Database](_index_.database.md).[listenerCount](_index_.database.md#static-listenercount)*

Defined in node_modules/@types/node/events.d.ts:18

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
