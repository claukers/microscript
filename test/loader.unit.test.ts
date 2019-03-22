import { describe, it, before, after } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as path from 'path';
import * as rewiremock from 'rewiremock';

describe('lib.util.loader unit tests', function () {
  this.timeout(100000);
  const fakeLogger = {
    info: sinon.fake(),
    error: sinon.fake()
  };
  const fakeServer = {

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
    listen: sinon.fake((port, cb) => {
      setTimeout(() => {
        cb(null);
      }, 0);
      return fakeServer;
    })
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
    rewiremock.default("../util").with({ Util: FakeUtil });
    rewiremock.default("nodeScript").with(fakeScriptModule);
    rewiremock.default(pathrc).with({ "models-path": "models" });
    rewiremock.default("models").with(fakeModels);
    rewiremock.default.enable();
    done();
  });
  after((done) => {
    rewiremock.default.disable();
    done();
  });
  it('setupDB', (done) => {
    const test = async () => {
      const loaders = require("../src/util/loader");
      const { setupDB } = loaders;
      const oldDIR = process.env.MICRO_DIRNAME;
      process.env.MICRO_DIRNAME = "";
      const ret = setupDB();
      chai.expect(ret).to.be.equals(fakeModels);
      process.env.MICRO_DIRNAME = oldDIR;
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
  it('runInstance', (done) => {
    const test = async () => {
      const oldCount = fakeExpress.callCount;
      const oldCount2 = fakeApp.listen.callCount;
      const oldCount3 = FakeUtil.checkEnvVariables.callCount;
      const loaders = require("../src/util/loader");
      await loaders.runInstance(fakeLogger, fakeScriptModule, "nodeScript");
      chai.expect(fakeExpress.callCount).to.be.equals(oldCount + 1);
      chai.expect(fakeApp.listen.callCount).to.be.equals(oldCount2 + 1);
      chai.expect(FakeUtil.checkEnvVariables.callCount).to.be.equals(oldCount3 + 1);
    };
    test().then(done).catch(done);
  });
});
