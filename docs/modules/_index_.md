[miqro](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Classes

* [APIResponse](../classes/_index_.apiresponse.md)
* [AbstractModelService](../classes/_index_.abstractmodelservice.md)
* [BadRequestResponse](../classes/_index_.badrequestresponse.md)
* [CLIUtil](../classes/_index_.cliutil.md)
* [ConfigFileNotFoundError](../classes/_index_.configfilenotfounderror.md)
* [ConfigPathResolver](../classes/_index_.configpathresolver.md)
* [Database](../classes/_index_.database.md)
* [ErrorResponse](../classes/_index_.errorresponse.md)
* [FakeDeleteModelService](../classes/_index_.fakedeletemodelservice.md)
* [FeatureToggle](../classes/_index_.featuretoggle.md)
* [ForbiddenError](../classes/_index_.forbiddenerror.md)
* [ForbiddenResponse](../classes/_index_.forbiddenresponse.md)
* [GroupPolicy](../classes/_index_.grouppolicy.md)
* [MethodNotImplementedError](../classes/_index_.methodnotimplementederror.md)
* [ModelService](../classes/_index_.modelservice.md)
* [NotFoundResponse](../classes/_index_.notfoundresponse.md)
* [ParseOptionsError](../classes/_index_.parseoptionserror.md)
* [PostListModelService](../classes/_index_.postlistmodelservice.md)
* [ServiceResponse](../classes/_index_.serviceresponse.md)
* [StopWatch](../classes/_index_.stopwatch.md)
* [UnAuthorizedError](../classes/_index_.unauthorizederror.md)
* [UnAuthorizedResponse](../classes/_index_.unauthorizedresponse.md)
* [Util](../classes/_index_.util.md)

### Interfaces

* [ICMDMap](../interfaces/_index_.icmdmap.md)
* [IGroupPolicyOptions](../interfaces/_index_.igrouppolicyoptions.md)
* [IModelService](../interfaces/_index_.imodelservice.md)
* [INoTokenSession](../interfaces/_index_.inotokensession.md)
* [IServiceArgs](../interfaces/_index_.iserviceargs.md)
* [ISession](../interfaces/_index_.isession.md)
* [ISimpleMap](../interfaces/_index_.isimplemap.md)
* [IVerifyTokenService](../interfaces/_index_.iverifytokenservice.md)

### Type aliases

* [IGroupPolicy](_index_.md#igrouppolicy)
* [IGroupPolicyItem](_index_.md#igrouppolicyitem)

### Variables

* [ErrorHandler](_index_.md#const-errorhandler)
* [GroupPolicyHandler](_index_.md#const-grouppolicyhandler)
* [Handler](_index_.md#const-handler)
* [ModelHandler](_index_.md#const-modelhandler)
* [ModelRouter](_index_.md#const-modelrouter)
* [NextErrorHandler](_index_.md#const-nexterrorhandler)
* [Op](_index_.md#const-op)
* [ResponseHandler](_index_.md#const-responsehandler)
* [SessionHandler](_index_.md#const-sessionhandler)
* [createErrorResponse](_index_.md#const-createerrorresponse)
* [createServiceResponse](_index_.md#const-createserviceresponse)
* [defaultLogFormat](_index_.md#const-defaultlogformat)
* [defaultLoggerFactory](_index_.md#const-defaultloggerfactory)
* [getResults](_index_.md#const-getresults)
* [makemigrations](_index_.md#const-makemigrations)
* [migrate](_index_.md#const-migrate)
* [parseIncludeQuery](_index_.md#const-parseincludequery)
* [seed](_index_.md#const-seed)
* [setResults](_index_.md#const-setresults)
* [setupMiddleware](_index_.md#const-setupmiddleware)
* [winstonConfig](_index_.md#const-winstonconfig)

## Type aliases

###  IGroupPolicy

Ƭ **IGroupPolicy**: *"at_least_one" | "all"*

Defined in node_modules/miqro-core/dist/util/index.d.ts:9

___

###  IGroupPolicyItem

Ƭ **IGroupPolicyItem**: *string | string[]*

Defined in node_modules/miqro-core/dist/util/index.d.ts:10

## Variables

### `Const` ErrorHandler

• **ErrorHandler**: *function*

Defined in node_modules/miqro-express/dist/route/common/handler.d.ts:3

#### Type declaration:

▸ (`logger?`: any): *function*

**Parameters:**

Name | Type |
------ | ------ |
`logger?` | any |

▸ (`err`: Error, `req`: Request‹ParamsDictionary›, `res`: Response, `next`: NextFunction): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |
`req` | Request‹ParamsDictionary› |
`res` | Response |
`next` | NextFunction |

___

### `Const` GroupPolicyHandler

• **GroupPolicyHandler**: *function*

Defined in node_modules/miqro-express/dist/route/session.d.ts:4

#### Type declaration:

▸ (`options`: [IGroupPolicyOptions](../interfaces/_index_.igrouppolicyoptions.md), `logger?`: any): *function*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [IGroupPolicyOptions](../interfaces/_index_.igrouppolicyoptions.md) |
`logger?` | any |

▸ (`req`: Request‹ParamsDictionary›, `res`: Response, `next`: NextFunction): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | Request‹ParamsDictionary› |
`res` | Response |
`next` | NextFunction |

___

### `Const` Handler

• **Handler**: *function*

Defined in node_modules/miqro-express/dist/route/common/handler.d.ts:4

#### Type declaration:

▸ (`fn`: function, `logger?`: any): *function*

**Parameters:**

▪ **fn**: *function*

▸ (`req`: Request‹ParamsDictionary›, `res`: Response): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | Request‹ParamsDictionary› |
`res` | Response |

▪`Optional`  **logger**: *any*

▸ (`req`: any, `res`: any, `next`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |
`next` | any |

___

### `Const` ModelHandler

• **ModelHandler**: *function*

Defined in node_modules/miqro-sequelize-express/dist/route/index.d.ts:3

#### Type declaration:

▸ (`service`: [IModelService](../interfaces/_index_.imodelservice.md), `logger?`: any): *function*

**Parameters:**

Name | Type |
------ | ------ |
`service` | [IModelService](../interfaces/_index_.imodelservice.md) |
`logger?` | any |

▸ (`req`: any, `res`: any, `next`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |
`next` | any |

___

### `Const` ModelRouter

• **ModelRouter**: *function*

Defined in node_modules/miqro-sequelize-express/dist/route/index.d.ts:4

#### Type declaration:

▸ (`service`: [IModelService](../interfaces/_index_.imodelservice.md), `router?`: Router, `logger?`: any): *Router*

**Parameters:**

Name | Type |
------ | ------ |
`service` | [IModelService](../interfaces/_index_.imodelservice.md) |
`router?` | Router |
`logger?` | any |

___

### `Const` NextErrorHandler

• **NextErrorHandler**: *function*

Defined in node_modules/miqro-express/dist/route/common/handler.d.ts:2

#### Type declaration:

▸ (`fn`: function, `logger?`: any): *function*

**Parameters:**

▪ **fn**: *function*

▸ (`req`: Request‹ParamsDictionary›, `res`: Response, `next`: NextFunction): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | Request‹ParamsDictionary› |
`res` | Response |
`next` | NextFunction |

▪`Optional`  **logger**: *any*

▸ (`req`: any, `res`: any, `next`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |
`next` | any |

___

### `Const` Op

• **Op**: *object*

Defined in node_modules/sequelize/types/lib/operators.d.ts:4

object that holds all operator symbols

#### Type declaration:

* **adjacent**: *keyof symbol*

* **all**: *keyof symbol*

* **and**: *keyof symbol*

* **any**: *keyof symbol*

* **between**: *keyof symbol*

* **col**: *keyof symbol*

* **contained**: *keyof symbol*

* **contains**: *keyof symbol*

* **endsWith**: *keyof symbol*

* **eq**: *keyof symbol*

* **gt**: *keyof symbol*

* **gte**: *keyof symbol*

* **iLike**: *keyof symbol*

* **iRegexp**: *keyof symbol*

* **in**: *keyof symbol*

* **is**: *keyof symbol*

* **like**: *keyof symbol*

* **lt**: *keyof symbol*

* **lte**: *keyof symbol*

* **ne**: *keyof symbol*

* **noExtendLeft**: *keyof symbol*

* **noExtendRight**: *keyof symbol*

* **not**: *keyof symbol*

* **notBetween**: *keyof symbol*

* **notILike**: *keyof symbol*

* **notIRegexp**: *keyof symbol*

* **notIn**: *keyof symbol*

* **notLike**: *keyof symbol*

* **notRegexp**: *keyof symbol*

* **or**: *keyof symbol*

* **overlap**: *keyof symbol*

* **placeholder**: *keyof symbol*

* **regexp**: *keyof symbol*

* **startsWith**: *keyof symbol*

* **strictLeft**: *keyof symbol*

* **strictRight**: *keyof symbol*

* **substring**: *keyof symbol*

* **values**: *keyof symbol*

___

### `Const` ResponseHandler

• **ResponseHandler**: *function*

Defined in node_modules/miqro-express/dist/route/common/handler.d.ts:5

#### Type declaration:

▸ (`responseFactory?`: any, `logger?`: any): *function*

**Parameters:**

Name | Type |
------ | ------ |
`responseFactory?` | any |
`logger?` | any |

▸ (`req`: any, `res`: any, `next`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |
`next` | any |

___

### `Const` SessionHandler

• **SessionHandler**: *function*

Defined in node_modules/miqro-express/dist/route/session.d.ts:3

#### Type declaration:

▸ (`authService`: [IVerifyTokenService](../interfaces/_index_.iverifytokenservice.md), `logger?`: any): *function*

**Parameters:**

Name | Type |
------ | ------ |
`authService` | [IVerifyTokenService](../interfaces/_index_.iverifytokenservice.md) |
`logger?` | any |

▸ (`req`: Request‹ParamsDictionary›, `res`: Response, `next`: NextFunction): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | Request‹ParamsDictionary› |
`res` | Response |
`next` | NextFunction |

___

### `Const` createErrorResponse

• **createErrorResponse**: *function*

Defined in node_modules/miqro-express/dist/route/common/handlerutils.d.ts:3

#### Type declaration:

▸ (`e`: any, `req`: Request‹ParamsDictionary›): *Promise‹[APIResponse](../classes/_index_.apiresponse.md)›*

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |
`req` | Request‹ParamsDictionary› |

___

### `Const` createServiceResponse

• **createServiceResponse**: *function*

Defined in node_modules/miqro-express/dist/route/common/handlerutils.d.ts:4

#### Type declaration:

▸ (`req`: any, `res`: any): *Promise‹[ServiceResponse](../classes/_index_.serviceresponse.md)›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`res` | any |

___

### `Const` defaultLogFormat

• **defaultLogFormat**: *Format*

Defined in node_modules/miqro-core/dist/util/loader.d.ts:1

___

### `Const` defaultLoggerFactory

• **defaultLoggerFactory**: *function*

Defined in node_modules/miqro-core/dist/util/loader.d.ts:2

#### Type declaration:

▸ (`identifier`: any): *object*

**Parameters:**

Name | Type |
------ | ------ |
`identifier` | any |

* **format**: *Format*

* **transports**: *any[]*

___

### `Const` getResults

• **getResults**: *function*

Defined in node_modules/miqro-express/dist/route/common/handlerutils.d.ts:6

#### Type declaration:

▸ (`req`: any): *any[]*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |

___

### `Const` makemigrations

• **makemigrations**: *function*

Defined in node_modules/miqro-sequelize/dist/db/migrations.d.ts:1

#### Type declaration:

▸ (): *string*

___

### `Const` migrate

• **migrate**: *function*

Defined in node_modules/miqro-sequelize/dist/db/migrations.d.ts:2

#### Type declaration:

▸ (): *void*

___

### `Const` parseIncludeQuery

• **parseIncludeQuery**: *function*

Defined in node_modules/miqro-sequelize/dist/service/common/model.d.ts:10

#### Type declaration:

▸ (`includeQuery`: any[]): *any[]*

**Parameters:**

Name | Type |
------ | ------ |
`includeQuery` | any[] |

___

### `Const` seed

• **seed**: *function*

Defined in node_modules/miqro-sequelize/dist/db/migrations.d.ts:3

#### Type declaration:

▸ (): *void*

___

### `Const` setResults

• **setResults**: *function*

Defined in node_modules/miqro-express/dist/route/common/handlerutils.d.ts:5

#### Type declaration:

▸ (`req`: any, `results`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`req` | any |
`results` | any[] |

___

### `Const` setupMiddleware

• **setupMiddleware**: *function*

Defined in node_modules/miqro-express/dist/middleware/index.d.ts:1

#### Type declaration:

▸ (`app`: any, `logger?`: any): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`app` | any |
`logger?` | any |

___

### `Const` winstonConfig

• **winstonConfig**: *function*

Defined in node_modules/miqro-core/dist/util/loader.d.ts:6

#### Type declaration:

▸ (): *any*
