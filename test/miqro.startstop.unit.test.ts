import { describe, it, before, after } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as rewiremock from 'rewiremock';

describe('lib.Miqro.start/stop unit tests', function () {
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
  const fakePool = {
    on: sinon.fake(),
    acquire: sinon.fake(async () => {
      return {
        once: sinon.fake()
      };
    }),
    release: sinon.fake(async () => {
    }),
    start: sinon.fake(),
    drain: sinon.fake(),
    clear: sinon.fake()
  };
  const scriptPoolFake = {
    createForkPool: sinon.fake((args) => {
      return fakePool;
    }),
    createClusterPool: sinon.fake((args) => {
      return fakePool;
    })
  };
  before((done) => {
    rewiremock.default.disable();
    rewiremock.default.enable();
    rewiremock.default.disable();
    rewiremock.default("script-pool").with(scriptPoolFake);
    rewiremock.default("./util/loader").with({ setupInstance: setupInstanceFake, runInstance: runInstanceFake });
    rewiremock.default.enable();
    done();
  });
  after((done) => {
    rewiremock.default.disable();
    done();
  });
  it('cluster mode', (done) => {
    const test = async () => {
      const lib = require('../src');
      const nodeCount = 5;
      const nodeName = "bla.js";
      const nodeService = "test1";
      const miqro = new lib.Miqro({
        name: nodeName,
        nodes: nodeCount,
        service: nodeService,
        mode: "cluster"
      });
      const oldCount = fakePool.start.callCount;
      const oldCount1 = fakePool.drain.callCount;
      const oldCount2 = fakePool.clear.callCount;
      await miqro.start();
      chai.expect(fakePool.start.callCount).to.be.equals(oldCount + 1);
      chai.expect(fakePool.drain.callCount).to.be.equals(oldCount1);
      chai.expect(fakePool.clear.callCount).to.be.equals(oldCount2);
      await miqro.stop();
      chai.expect(fakePool.drain.callCount).to.be.equals(oldCount1 + 1);
      chai.expect(fakePool.clear.callCount).to.be.equals(oldCount2 + 1);
    };
    test().then(done).catch(done);
  });
  it('fork mode', (done) => {
    const test = async () => {
      const lib = require('../src');
      const nodeCount = 1;
      const nodeName = "bla.js";
      const nodeService = "test1";
      const miqro = new lib.Miqro({
        name: nodeName,
        nodes: nodeCount,
        service: nodeService,
        mode: "fork"
      });
      const oldCount = fakePool.start.callCount;
      const oldCount1 = fakePool.drain.callCount;
      const oldCount2 = fakePool.clear.callCount;
      await miqro.start();
      chai.expect(fakePool.start.callCount).to.be.equals(oldCount + 1);
      chai.expect(fakePool.drain.callCount).to.be.equals(oldCount1);
      chai.expect(fakePool.clear.callCount).to.be.equals(oldCount2);
      await miqro.stop();
      chai.expect(fakePool.drain.callCount).to.be.equals(oldCount1 + 1);
      chai.expect(fakePool.clear.callCount).to.be.equals(oldCount2 + 1);
    };
    test().then(done).catch(done);
  });
  it('simple mode', (done) => {
    const test = async () => {
      const lib = require('../src');
      const nodeCount = 1;
      const nodeName = "bla.js";
      const nodeService = "test1";
      const miqro = new lib.Miqro({
        name: nodeName,
        nodes: nodeCount,
        service: nodeService,
        mode: "simple"
      });
      const oldCountPool = fakePool.start.callCount;
      const oldCount = setupInstanceFake.callCount;
      const oldCount2 = runInstanceFake.callCount;
      const oldCount3 = simpleInstanceFake.server.close.callCount;
      await miqro.start();
      chai.expect(fakePool.start.callCount).to.be.equals(oldCountPool);
      chai.expect(simpleInstanceFake.server.close.callCount).to.be.equals(oldCount3);
      chai.expect(setupInstanceFake.callCount).to.be.equals(oldCount + 1);
      const nameArg = setupInstanceFake.args[oldCount][0];
      const serviceArg = setupInstanceFake.args[oldCount][1];
      const loggerArg = runInstanceFake.args[oldCount2][0];
      const scriptArg = runInstanceFake.args[oldCount2][1];
      const serviceArg2 = runInstanceFake.args[oldCount2][2];
      chai.expect(runInstanceFake.callCount).to.be.equals(oldCount2 + 1);
      chai.expect(nameArg).to.be.equals(nodeName);
      chai.expect(serviceArg).to.be.equals(nodeService);
      chai.expect(loggerArg).to.be.equals(setupFakeInstance.logger);
      chai.expect(scriptArg).to.be.equals(setupFakeInstance.script);
      chai.expect(serviceArg2).to.be.equals(nodeService);
      await miqro.stop();
      chai.expect(simpleInstanceFake.server.close.callCount).to.be.equals(oldCount3 + 1);
    };
    test().then(done).catch(done);
  });
});

