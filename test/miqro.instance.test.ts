import { describe, it, before, after } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as path from 'path';
import * as rewiremock from 'rewiremock';

describe('lib.instance unit tests', function () {
  this.timeout(100000);
  const simpleInstanceFake = {
    server: {
      close: sinon.fake()
    }
  };
  const setupFakeInstance = {
    logger: sinon.fake(),
    script: sinon.fake()
  };
  const setupInstanceFake = sinon.fake(() => {
    return setupFakeInstance;
  });
  const runInstanceFake = sinon.fake(async () => {
    return simpleInstanceFake;
  });
  before((done) => {
    rewiremock.default.disable();
    rewiremock.default.enable();
    rewiremock.default.disable();
    rewiremock.default("./util/loader").with({ setupInstance: setupInstanceFake, runInstance: runInstanceFake });
    rewiremock.default.enable();
    done();
  });
  after((done) => {
    rewiremock.default.disable();
    done();
  });
  it('setup', (done) => {
    const test = async () => {
      const nodeName = "name";
      const nodeService = "service";
      process.argv = [nodeName, nodeService];
      const oldCount = setupInstanceFake.callCount;
      const oldCount2 = runInstanceFake.callCount;
      const oldCount3 = simpleInstanceFake.server.close.callCount;
      require("../src/instance");
      chai.expect(simpleInstanceFake.server.close.callCount).to.be.equals(oldCount3);
      chai.expect(setupInstanceFake.callCount).to.be.equals(oldCount + 1);
      const nameArg = setupInstanceFake.args[oldCount][0];
      const serviceArg = setupInstanceFake.args[oldCount][1];
      const loggerArg = runInstanceFake.args[oldCount2][0];
      const scriptArg = runInstanceFake.args[oldCount2][1];
      const serviceArg2 = runInstanceFake.args[oldCount2][2];
      chai.expect(runInstanceFake.callCount).to.be.equals(oldCount2 + 1);
      chai.expect(nameArg).to.be.equals(nodeName);
      chai.expect(serviceArg).to.be.equals(path.resolve(nodeService));
      chai.expect(loggerArg).to.be.equals(setupFakeInstance.logger);
      chai.expect(scriptArg).to.be.equals(setupFakeInstance.script);
      chai.expect(serviceArg2).to.be.equals(path.resolve(nodeService));
    };
    test().then(done).catch(done);
  });
});
