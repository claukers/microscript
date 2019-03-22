import { describe, it, before, after } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as rewiremock from 'rewiremock';

describe('lib.Miqro.new unit tests', function () {
  this.timeout(100000);
  const scriptPoolFake = {
    createForkPool: sinon.fake((args) => {
      return {
        on: sinon.fake(),
        start: sinon.fake(),
        drain: sinon.fake(),
        clear: sinon.fake()
      }
    }),
    createClusterPool: sinon.fake((args) => {
      return {
        on: sinon.fake(),
        start: sinon.fake(),
        drain: sinon.fake(),
        clear: sinon.fake()
      }
    })
  };
  before((done) => {
    rewiremock.default.disable();
    rewiremock.default.enable();
    rewiremock.default.disable();
    rewiremock.default("script-pool").with(scriptPoolFake);
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
      new lib.Miqro({
        name: nodeName,
        nodes: nodeCount,
        service: nodeService,
        mode: "cluster"
      });
      chai.expect(scriptPoolFake.createClusterPool.callCount).to.be.equals(1);
      chai.expect(scriptPoolFake.createClusterPool.args.length).to.be.equals(1);
      chai.expect(scriptPoolFake.createClusterPool.args[0].length).to.be.equals(3);
      const argConfig = scriptPoolFake.createClusterPool.args[0][0];
      chai.expect(argConfig.min).to.be.equals(nodeCount);
      chai.expect(argConfig.max).to.be.equals(nodeCount);
      chai.expect(argConfig.autostart).to.be.equals(false);
      const argScript = scriptPoolFake.createClusterPool.args[0][1];
      const argArgs = scriptPoolFake.createClusterPool.args[0][2];
      chai.expect(argArgs[0]).to.be.equals(nodeName);
      chai.expect(argArgs[1]).to.be.equals(nodeService);
    };
    test().then(done).catch(done);
  });

  it('fork mode', (done) => {
    const test = async () => {
      const lib = require('../src');
      const nodeCount = 1;
      const nodeName = "bla.js";
      const nodeService = "test1";
      new lib.Miqro({
        name: nodeName,
        nodes: nodeCount,
        service: nodeService,
        mode: "fork"
      });
      chai.expect(scriptPoolFake.createForkPool.callCount).to.be.equals(1);
      chai.expect(scriptPoolFake.createForkPool.args.length).to.be.equals(1);
      chai.expect(scriptPoolFake.createForkPool.args[0].length).to.be.equals(3);
      const argConfig = scriptPoolFake.createForkPool.args[0][0];
      chai.expect(argConfig.min).to.be.equals(nodeCount);
      chai.expect(argConfig.max).to.be.equals(nodeCount);
      chai.expect(argConfig.autostart).to.be.equals(false);
      const argScript = scriptPoolFake.createForkPool.args[0][1];
      const argArgs = scriptPoolFake.createForkPool.args[0][2];
      chai.expect(argArgs[0]).to.be.equals(nodeName);
      chai.expect(argArgs[1]).to.be.equals(nodeService);
    };
    test().then(done).catch(done);
  });

  it('simple mode', (done) => {
    const test = async () => {
      const lib = require('../src');
      const nodeCount = 1;
      const nodeName = "bla.js";
      const nodeService = "test1";
      const config = {
        name: nodeName,
        nodes: nodeCount,
        service: nodeService,
        mode: "simple"
      };
      const oldForkCount = scriptPoolFake.createForkPool.callCount;
      const oldClusterCount = scriptPoolFake.createClusterPool.callCount;
      const miqro = new lib.Miqro(config);
      chai.expect(miqro.config).to.be.equals(config);
      chai.expect(scriptPoolFake.createForkPool.callCount).to.be.equals(oldForkCount);
      chai.expect(scriptPoolFake.createClusterPool.callCount).to.be.equals(oldClusterCount);
    };
    test().then(done).catch(done);
  });
});

