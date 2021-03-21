# miqro

helpers for creating apis applications with nodejs **http** module and **sequelize**.

this module is just a cli for the following npm modules.

- logging, config loading, feature toggling see [@miqro/core](https://www.npmjs.com/package/@miqro/core)

- express handlers see [@miqro/handlers](https://www.npmjs.com/package/@miqro/handlers)

- sequelize integration see [@miqro/database](https://www.npmjs.com/package/@miqro/database)

- sequelize express handlers [@miqro/modelhandlers](https://www.npmjs.com/package/@miqro/modelhandlers)

#### cli

```
npx miqro <command> [args]
Available commands:
	doc			outputs to stdout an api folder auto doc as a json
	doc:md			outputs to a file an api folder auto doc as a markdown
	config			outputs to stdout the config as a json
	config:bash		outputs to stdout the config as a bash script
	config:env		outputs to stdout the config as a env file
	config:init		inits your config folder
	db:console		runs a readline interface that send the input as a query
	db:dump:data		dump the data of the database (only defined models)
	db:push:data		push a dump to the database
	db:automigrate		runs makemigrations and migrate together
	db:makemigration	seeks changes in your models and creates migrations
	db:migrate:status	npx sequelize-cli db:migrate:status
	db:migrate		npx sequelize-cli db:migrate
	db:seed:all		npx sequelize-cli db:seed:all
	db:seed:undo:all	npx sequelize-cli db:seed:undo:all
	db:seed:undo		npx sequelize-cli db:seed:undo
	db:create:model		creates an example model
	db:init			init sequelize configuration.
	start			starts a microservice
	start:script		starts a script
	start:api		starts an apirouter on a directory
	watch			starts a microservice in watch mode on the service dir
	watch:script		starts a script in watch mode on the script dir
	watch:api		starts a apirouter on a directory in watch mode on the dir
	version			prints the version.
```
