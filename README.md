# miqro

little framework for creating microservices with **express**, **sequelize** and **sequelize-auto-migrations**.

- Database models **auto-migration**.

- **Route->ModelService->Model** pattern base classes.

- Runner for cluster and debug.

- Configuration for multiple enviroments with dotenv files.
  
- All project configuration, migrations, seeders and models are independant of **miqro** so you can **eject** your microservice easily and/or use another runner like **pm2**.

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

TODO

## configuration

TODO

## using miqro without the runner

TODO

## using the miqro runner

TODO

## api

TODO
