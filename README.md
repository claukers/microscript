# miqro

little framework for creating microservices with **express**, **sequelize** and **sequelize-auto-migrations**.

- database **auto-migration**.

- **route->modelservice->model** pattern base classes.

- optional **jwt** implementation.

- runner for cluster, fork and debug.

- configuration for multiple enviroments with dotenv files.
  
- all project configuration, migrations, seeders and models are independant of **miqro** so you can **eject** your microservice easily from **miqro** and/or use another runner like **pm2**.

- exports type files for using miqro with **Typescript**.


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

create a main service file ```src/posts.js``` like this.

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

create a sequelize model file ```db/models/post.js```.

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

now lets take care of the tables of the development database.

```npx miqro automigrate src/posts.js```

**take notice that the last argument is the service script not a model in particular.**

**automigrate will run sequelize-automigrations and that will create migrations for creations, deletions or modifications of models created in the project and will try to apply them.**

finally lets review the newly generated dotenv configuration file for your **$NODE_ENV**( by default is **development** ) located in ```config/development.env```. This file holds the configuration environment variables miqro uses to configure its component. **Its is encouraged to load the passwords. secrets and other sensible information from a secret manager into the process.env.**

then start a node inspect/debug friendly mode.

```npx miqro start src/posts.js```

or directly with node inspect 

```node inspect node_modules/.bin/miqro start src/posts.js```

**usefull for some IDE's with node debug support like VSCode**

You can also start the service in a cluster mode for better performance with the miqro runner.

example.

```npx miqro start 4 cluster src/posts.js```

this will create 4 processes running your service in a node cluster.

## configuration

by default all configuration is done with env variables. You can load the env variables using the ```Util.loadConfig()``` call. This will load the correct **dotenv** file located in ```$MIQRO_DIRNAME/config/$NODE_ENV.env```.

## jwt

miqro provides a very simple implementation of jwt using the **jsonwebtoken** module. Like every piece of miqro the use of this is optional. 

**NOTE** it's recommended that you put a API Gateway or Managment software ( like KONG ) on top of your miqroservices than implementing authentication directly on your service.

#### setup jwt_header, jwt_secret and default expiration

edit your ```$MIQRO_DIRNAME/config/$NODE_ENV.env``` file and add this.

```dotenv
JWT_HEADER=X-MYSERVICE-TOKEN
JWT_SECRET=super secret
JWT_EXPIRATION=3d
```

#### create a simple jwt protected route

a protected route is a route that can only be access with a valid token. the token must be in the incoming **request header** called like the **JWT_HEADER** env variable. 

the **JWT_HEADER** env variable can be set in the ```$MIQRO_DIRNAME/config/$NODE_ENV.env``` dotenv file.

```javascript
...
const { ProtectedRoute } = require("miqro");
...
// create a protected route and add some protected routes
// keep in mind that only the token will be validated
const api = new ProtectedRoute()
  .use("/user", new ModelRoute(new ModelService(db.models.user)));
...
// attach route
app.use("/api/v1", api.routes());
```

#### create a simple jwt auth route

a auth route is a route that can only be access with a valid token with the except of the [POST][/authenticate] path. the token must be in the incoming **request header** called like the **JWT_HEADER** env variable.

the **JWT_HEADER** env variable can be set in the ```$MIQRO_DIRNAME/config/$NODE_ENV.env``` dotenv file.

```javascript
...
const { AuthRoute } = require("miqro");
...
// create a protected route and add some protected routes
// keep in mind that only the token will be validated
const api = new AuthRoute()
  .use("/user", new ModelRoute(new ModelService(db.models.user)));
...
// attach route
app.use("/api/v1", api.routes());
```

#### create a custom protected route

```javascript
...
const { ProtectedRoute } = require("miqro");
...
// create a protected route and add some protected routes
// keep in mind that only the token will be validated
const api = new ProtectedRoute({
  auth: {
    verify: async ({ token }) => {
      return {
        token: "token";
        account: "account",
        user: "user",
        groups: ["group1", "group2"]
      }; // OR NULL/undefined/false for a an invalid token
    }
  }
})
  .use("/user", new ModelRoute(new ModelService(db.models.user)));
...
// attach route
app.use("/api/v1", api.routes());
```

#### create a custom auth route

```javascript
...
const { AuthRoute } = require("miqro");
...
// create a protected route and add some protected routes
// keep in mind that only the token will be validated
const api = new AuthRoute({
  auth: {
    authenticate: async (req) => {
      return {
        token: "token";
        account: "account",
        user: "user",
        groups: ["group1", "group2"]
      }; // OR NULL/undefined/false for a an invalid authenticate
    },
    verify: async ({ token }) => {
      return {
        token: "token";
        account: "account",
        user: "user",
        groups: ["group1", "group2"]
      }; // OR NULL/undefined/false for a an invalid token
    }
  }
})
  .use("/user", new ModelRoute(new ModelService(db.models.user)));
...
// attach route
app.use("/api/v1", api.routes());
```

## using miqro without the runner

you should be able to run your microservice without the miqro runner simply defining the ```MIQRO_DIRNAME``` env variable so that the components of **miqro** you are using will be able to **find** the config **dotenv files**.

the ```MIQRO_DIRNAME``` env variable must point to the parent folder of the ```config``` folder that contains the dotenv files.

like this.

```
$MIQRO_DIRNAME/config/development.env
```

then create a ```src/main.js``` creating a simple express server.
```javascript
const express = require("express");
const { Util, setupMiddleware } = require("miqro");
// process.env.MIQRO_DIRNAME must exists!
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

```node src/main.js```


## using the miqro runner

miqro has its own runner with auto-restart and can start your service in a **cluster**, **fork** or simple mode for debugging purposes.

usage 

```miqro start [nodes=1] [mode=simple] <microservice.js>```

example start in simple node

```miqro start src/posts.js```

**simple mode is usefull for running the service in a debug environment like node inspect**

example start with 4 cluster nodes

```miqro start 4 cluster src/posts.js```

example start in fork node

```miqro start fork src/posts.js```

## documentation

TODO
