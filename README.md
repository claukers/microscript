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

## jwt

miqro provides a very simple implementation of jwt using the **jsonwebtoken** module. Like every piece of miqro the use of this is optional. 

**NOTE** it's recommended that you put a API Gateway or Managment software on top of your miqroservices than implementing authentication directly on yout service.

#### setup account, user, token database models

create ```$MIQRO_DIRNAME/db/models/account.js```

```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  account.associate = function (models) {
  };
  return account;
};
```

create ```$MIQRO_DIRNAME/db/models/user.js```

```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  user.associate = function (models) {
  };
  return user;
};
```

create ```$MIQRO_DIRNAME/db/models/accountuser.js```

```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const accountuser = sequelize.define('accountuser', {
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  accountuser.associate = function (models) {
    models.user.belongsToMany(models.account, { through: models.accountuser });
    models.account.belongsToMany(models.user, { through: models.accountuser });
  };
  return accountuser;
};
```

create ```$MIQRO_DIRNAME/db/models/token.js```

```javascript
'use strict';
module.exports = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    expiration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  token.associate = function (models) {
    models.token.belongsTo(models.user);
    models.user.hasMany(models.token);
  };
  return token;
};
```

**NOTE** you can add more complex models if you like. the above is the minimal setup.

#### setup jwt_header, jwt_secret and default expiration

edit your ```$MIQRO_DIRNAME/config/$NODE_ENV.env``` file and add this.

```dotenv
JWT_HEADER=X-MYSERVICE-TOKEN
JWT_SECRET=super secret
JWT_EXPIRATION=3d
```

#### create a protected route

a protected route is a route that can only be access with a valid token. the token must be in the incoming **request header** called like the **JWT_HEADER** env variable. 

the **JWT_HEADER** env variable can be set in the ```$MIQRO_DIRNAME/config/$NODE_ENV.env``` dotenv file.

```javascript
...
const { ProtectedRoute } = require("miqro");
...
// create a protected route
const api = new ProtectedRoute();
// add some protected routes
// keep in mind that the role of the user will NOT be checked so add that logic to your service
api.router.get("/secrets");
api.router.use("/user", new ModelRoute(new ModelService(db.models.user)));
...
// attach route
app.use("/api/v1", api.routes());
```

#### add the login, logout routes

```javascript
...
const { AuthRoute } = require("miqro");
...
// create a auth route
const auth = new AuthRoute();
// attach route
app.use("/auth", auth.routes());
...
```

**NOTE** attach the AuthRoute in a non-protected route te be accesible.

this AuthRoute consist in.



- **POST** ```/login```

  - get a valid token with username/password

    - request

      - body.username: string // the username

      - body.password: string // the password

    - response

      - status 200 | 400
    
      - body.success: boolean // true if successfull

      - body.message: string // message of what happend

      - body.username?: string // the username

      - body.accounts?: string[] // the list of accounts the user belongs to

      - body.token?: string // token if successfull


- **GET** ```/login``` 

  - get the user information via the token

    - request

      - header.$JWT_HEADER: token

    - response

      - status 200 | 400
    
      - body.success: boolean // true if successfull

      - body.message: string // message of what happend

      - body.username?: string // the username

      - body.accounts?: string[] // the list of accounts the user belongs to


- **GET** ```/logout```

  - invalidate a valid token

    - request

      - header.$JWT_HEADER: token

    - response

      - status 200 | 400
    
      - body.success: boolean // true if successfull

      - body.message: string // message of what happend


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
