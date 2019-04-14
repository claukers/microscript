import { describe, it, before, after } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as path from 'path';
import rewiremockdefault, * as rewiremock from 'rewiremock';

describe('lib.util.loader unit tests', function () {
  this.timeout(100000);
  const fakeDataBaseInstance = {
    start: sinon.fake(async () => {

    })
  };
  const fakeDatabase = {
    Database: {
      getInstance: sinon.fake(() => {
        return fakeDataBaseInstance;
      })
    }
  };
  const fakePath = {
    resolve: sinon.fake()
  };
  const fakeFS = {
    readFileSync: sinon.fake(() => {
      return "fsreadsync";
    })
  };
  const fakeServer = {
    removeListener: sinon.fake((event, handler) => {

    }),
    once: sinon.fake((event, handler) => {

    }),
    listen: sinon.fake((port, cb) => {
      cb();
    })
  };
  const fakeHttp = {
    createServer: sinon.fake((app) => {
      return fakeServer;
    })
  };
  const fakeHttps = {
    createServer: sinon.fake((options, app) => {
      return fakeServer;
    })
  };
  const fakeMiddleware = {
    setupMiddleware: sinon.fake(async () => {

    })
  }
  const fakeLogger = {
    info: sinon.fake(),
    error: sinon.fake()
  };
  const fakeExpress = sinon.fake(() => {
    return fakeApp
  });
  const fakeModels = {};
  const FakeUtil = {
    getLogger: sinon.fake(() => {
      return fakeLogger;
    }),
    setupInstanceEnv: sinon.fake(),
    loadConfig: sinon.fake(),
    checkEnvVariables: sinon.fake(),
  }
  const fakeApp = {
  }
  const fakeScriptModule = sinon.fake(async (app) => {
    return fakeApp;
  });
  before((done) => {
    rewiremock.default.disable();
    rewiremock.default.enable();
    rewiremock.default.disable();
    const pathrc = path.resolve("", ".sequelizerc");
    rewiremock.default("express").with(fakeExpress);
    rewiremock.default("fs").with(fakeFS);
    rewiremock.default("../db").with(fakeDatabase);
    rewiremock.default("http").with(fakeHttp);
    rewiremock.default("https").with(fakeHttps);
    rewiremock.default("../util").with({ Util: FakeUtil });
    rewiremock.default("nodeScript").with(fakeScriptModule);
    rewiremock.default(pathrc).with({ "models-path": "models" });
    rewiremock.default("models").with(fakeModels);
    rewiremock.default("../middleware").with(fakeMiddleware);
    rewiremock.default.enable();
    done();
  });
  after((done) => {
    rewiremock.default.disable();
    done();
  });
  it('setupDB', (done) => {
    const test = async () => {
      try {
        const loaders = require("../src/util/loader");
        const { setupDB } = loaders;
        const oldDIR = process.env.MIQRO_DIRNAME;
        process.env.MIQRO_DIRNAME = "";
        const ret = setupDB();
        chai.expect(ret).to.be.equals(fakeModels);
        process.env.MIQRO_DIRNAME = oldDIR;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    test().then(done).catch(done);
  });
  it('setupInstance', (done) => {
    const test = async () => {
      const loaders = require("../src/util/loader");
      const name = "nodeName";
      const script = "nodeScript";
      const oldCount = FakeUtil.setupInstanceEnv.callCount;
      const setupRet = loaders.setupInstance(name, script);
      chai.expect(FakeUtil.setupInstanceEnv.callCount).to.be.equals(oldCount + 1);
      const serviceNameArg = FakeUtil.setupInstanceEnv.args[FakeUtil.setupInstanceEnv.args.length - 1][0]
      const scriptArg = FakeUtil.setupInstanceEnv.args[FakeUtil.setupInstanceEnv.args.length - 1][1]
      chai.expect(serviceNameArg).to.be.equals(name);
      chai.expect(scriptArg).to.be.equals(script);
      chai.expect(setupRet.script).to.be.equals(fakeScriptModule);
      chai.expect(setupRet.logger).to.be.equals(fakeLogger);
    };
    test().then(done).catch(done);
  });
  it('runInstance HTTPS_ENABLE false', (done) => {
    const test = async () => {
      const oldCount = fakeExpress.callCount;
      const oldCount2 = FakeUtil.checkEnvVariables.callCount;
      const oldCount3 = fakeMiddleware.setupMiddleware.callCount;

      const oldCount4 = fakeHttp.createServer.callCount;
      const oldCount5 = fakeServer.listen.callCount;
      const oldCount6 = fakeServer.once.callCount;
      const oldCount7 = fakeServer.removeListener.callCount;
      const oldCount8 = fakeDatabase.Database.getInstance.callCount;
      const oldCount9 = fakeDataBaseInstance.start.callCount;

      const loaders = require("../src/util/loader");
      await loaders.runInstance(fakeLogger, fakeScriptModule, "nodeScript");

      chai.expect(fakeExpress.callCount).to.be.equals(oldCount + 1);
      chai.expect(FakeUtil.checkEnvVariables.callCount).to.be.equals(oldCount2 + 1);
      chai.expect(fakeMiddleware.setupMiddleware.callCount).to.be.equals(oldCount3 + 1);
      chai.expect(fakeHttp.createServer.callCount).to.be.equals(oldCount4 + 1);
      const createServerArgs = fakeHttp.createServer.args[oldCount4];
      chai.expect(createServerArgs.length).to.be.equals(1);
      chai.expect(createServerArgs[0]).to.be.equals(fakeApp);
      chai.expect(fakeServer.listen.callCount).to.be.equals(oldCount5 + 1);
      const listenArgs = fakeServer.listen.args[oldCount5];
      chai.expect(listenArgs.length).to.be.equals(2);
      chai.expect(listenArgs[0]).to.be.equals(process.env.PORT);
      chai.expect(typeof listenArgs[1]).to.be.equals("function");
      chai.expect(fakeServer.once.callCount).to.be.equals(oldCount6 + 1);
      const onceArgs = fakeServer.once.args[oldCount6];
      chai.expect(onceArgs.length).to.be.equals(2);
      chai.expect(onceArgs[0]).to.be.equals("error");
      chai.expect(typeof onceArgs[1]).to.be.equals("function");
      chai.expect(fakeServer.removeListener.callCount).to.be.equals(oldCount7 + 1);
      const removeListenerArgs = fakeServer.removeListener.args[oldCount7];
      chai.expect(removeListenerArgs.length).to.be.equals(2);
      chai.expect(removeListenerArgs[0]).to.be.equals("error");
      chai.expect(typeof removeListenerArgs[1]).to.be.equals("function");
      chai.expect(removeListenerArgs[1]).to.be.equals(onceArgs[1]);
      chai.expect(fakeDatabase.Database.getInstance.callCount).to.be.equals(oldCount8 + 1);
      chai.expect(fakeDataBaseInstance.start.callCount).to.be.equals(oldCount9 + 1);
    };
    test().then(done).catch(done);
  });
  it('runInstance HTTPS_ENABLE true', (done) => {
    const test = async () => {
      rewiremock.default("path").with(fakePath);
      const oldCount = fakeExpress.callCount;
      const oldCount2 = FakeUtil.checkEnvVariables.callCount;
      const oldCount3 = fakeMiddleware.setupMiddleware.callCount;

      const oldCount4 = fakeHttps.createServer.callCount;
      const oldCount5 = fakeServer.listen.callCount;
      const oldCount6 = fakeServer.once.callCount;
      const oldCount7 = fakeServer.removeListener.callCount;
      const oldCount8 = fakePath.resolve.callCount;
      const oldCount9 = fakeFS.readFileSync.callCount;
      const oldCount10 = fakeDatabase.Database.getInstance.callCount;
      const oldCount11 = fakeDataBaseInstance.start.callCount;

      const loaders = require("../src/util/loader");
      const OLD_ENABLE = process.env.HTTPS_ENABLE;
      process.env.HTTPS_ENABLE = "true";
      await loaders.runInstance(fakeLogger, fakeScriptModule, "nodeScript");
      process.env.HTTPS_ENABLE = OLD_ENABLE;

      chai.expect(fakeExpress.callCount).to.be.equals(oldCount + 1);
      chai.expect(FakeUtil.checkEnvVariables.callCount).to.be.equals(oldCount2 + 2);
      chai.expect(fakeMiddleware.setupMiddleware.callCount).to.be.equals(oldCount3 + 1);
      chai.expect(fakeHttps.createServer.callCount).to.be.equals(oldCount4 + 1);
      const createServerArgs = fakeHttps.createServer.args[oldCount4];
      chai.expect(createServerArgs.length).to.be.equals(2);
      chai.expect(typeof createServerArgs[0]).to.be.equals("object");
      chai.expect(createServerArgs[0].key).to.be.equals("fsreadsync");
      chai.expect(createServerArgs[0].cert).to.be.equals("fsreadsync");
      chai.expect(createServerArgs[1]).to.be.equals(fakeApp);
      chai.expect(fakeServer.listen.callCount).to.be.equals(oldCount5 + 1);
      const listenArgs = fakeServer.listen.args[oldCount5];
      chai.expect(listenArgs.length).to.be.equals(2);
      chai.expect(listenArgs[0]).to.be.equals(process.env.PORT);
      chai.expect(typeof listenArgs[1]).to.be.equals("function");
      chai.expect(fakeServer.once.callCount).to.be.equals(oldCount6 + 1);
      const onceArgs = fakeServer.once.args[oldCount6];
      chai.expect(onceArgs.length).to.be.equals(2);
      chai.expect(onceArgs[0]).to.be.equals("error");
      chai.expect(typeof onceArgs[1]).to.be.equals("function");
      chai.expect(fakeServer.removeListener.callCount).to.be.equals(oldCount7 + 1);
      const removeListenerArgs = fakeServer.removeListener.args[oldCount7];
      chai.expect(removeListenerArgs.length).to.be.equals(2);
      chai.expect(removeListenerArgs[0]).to.be.equals("error");
      chai.expect(typeof removeListenerArgs[1]).to.be.equals("function");
      chai.expect(removeListenerArgs[1]).to.be.equals(onceArgs[1]);
      chai.expect(fakePath.resolve.callCount).to.be.equals(oldCount8 + 2);
      chai.expect(fakeFS.readFileSync.callCount).to.be.equals(oldCount9 + 2);
      chai.expect(fakeDatabase.Database.getInstance.callCount).to.be.equals(oldCount10 + 1);
      chai.expect(fakeDataBaseInstance.start.callCount).to.be.equals(oldCount11 + 1);
    };
    test().then(done).catch(done);
  });
});
