# miqro

little framework for creating microservices with **express**, **sequelize** and **sequelize-auto-migrations**.

- Database **auto-migration**.

- **Route->ModelService->Model** pattern base classes.

- Runner for cluster and debug.

- Configuration for multiple enviroments with dotenv files.
  
- All project configuration, migrations, seeders and models are independant of **miqro** so you can **eject** your microservice easily from **miqro** and/or use another runner like **pm2**.

- Exports type files for using miqro with **Typescript**.


## posts.js

```javascript
const {
  ModelRoute, 
  ModelService,
  Database
} = require("miqro");

const logger = Util.getLogger("posts.js");
const db = Database.getInstance();

module.exports = async (app) => {
  app.use("/post", 
    new ModelRoute(
      new ModelService(
        db.models.post
      )
    ).routes());
  return app;
};
```

## quick setup

**NOTE**

there is a miqro base project with Typescript hosted at https://github.com/claukers/miqro-typescript

create a empty nodejs project.

```$ npm init``` 


```$ npm install --save miqro```

create a service file ```src/posts.js``` like this.

```javascript
const {
  ModelRoute, 
  ModelService,
  Database,
  Util
} = require("miqro");

const logger = Util.getLogger("posts.js");
const db = Database.getInstance();

module.exports = async (app) => {
  app.use("/post", 
    new ModelRoute(
      new ModelService(
        db.models.post
      )
    ).routes());
  return app;
};
```

create a database model file ```db/models/post.js```.

```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  post.associate = function(models) {
  };
  return post;
};

```

finally lets create a dotenv file for your **NODE_ENV** by default is **development** ```config/development.env```.

```dotenv
DB_NAME=testdb
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_DIALECT=sqlite
DB_OPERATORSALIASES=false
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDDLE=10000
DB_STORAGE=./dev.sqlite3
DB_DROPTABLES=false
LOG_LEVEL="info"
PORT=8080
```

**every environment must have it's own dotenv file**

now lets take care of the tables of the development database.

```npx miqro automigrate src/posts.js```

**take notice that the last argument is the service script not a model in particular.**

**automigrate will create migrations for creations, deletions or modifications of models created in the project and will try to apply them.**

then start your service in a cluster of 4 proccess.

```npx miqro start 4 cluster src/posts.js```

or to start a node inspect/debug friendly mode.

```npx miqro start 1 simple src/posts.js```

or directly with node inspect.

```node inspect node_modules/.bin/miqro start 1 simple src/posts.js```

## configuration

by default all configuration is done with env variables. You can load the env variables using the ```Util.loadConfig()``` call. This will load the correct **dotenv** file located in ```$MIQRO_DIRNAME/config/$NODE_ENV.env```.

## using miqro without the runner

you should be able to run your microservice outside the miqro runner simply defining the ```MIQRO_DIRNAME``` env variable so that the components of **miqro** you are using will be able to **find** the config **dotenv files**.

the ```MIQRO_DIRNAME``` env variable must point to the parent folder of the ```config``` folder that contains the dotenv files.

create a ```src/main.js``` creating a simple express server.
```javascript
const express = require("express");
const { Util, setupMiddleware } = require("miqro");
Util.loadConfig();

const logger = Util.getLogger("main.js");
const service = require("./src/posts.js"); // the service file

const app = express();
setupMiddleware(app, logger);
service(app).then((server) => {
  server.listen(process.env.PORT);
}).listen(process.env.PORT);
```

then run it

```MIQRO_DIRNAME=$PWD node src/main.js```


## using the miqro runner

miqro has its own runner with autorestart and can start your service in a cluster, fork or simple mode.

usage 

```miqro start <nodes> <mode> <microservice.js>```

example 4 cluster nodes

```miqro start 4 cluster src/posts.js```

example 1 fork node

```miqro start 1 fork src/posts.js```

example 1 simple node

```miqro start 1 simple src/posts.js```

**simple mode is usefull for debugging the service**

## documentation

TODO
