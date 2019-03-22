import { describe, it, before, after } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as rewiremock from 'rewiremock';

describe('lib.db.migrations.makemigrations/migrate/seed unit tests', function () {
  this.timeout(100000);
  const execSyncBody = (cmd) => {
    return "running " + cmd;
  };
  const fakeCP = {
    execSync: sinon.fake((cmd, options) => {
      return execSyncBody(cmd);
    })
  };
  const fakePath = {
    resolve: sinon.fake((path) => {
      return path;
    })
  };
  before((done) => {
    rewiremock.default.disable();
    rewiremock.default.enable();
    rewiremock.default.disable();
    rewiremock.default("child_process").with(fakeCP);
    rewiremock.default("path").with(fakePath);
    rewiremock.default.enable();
    done();
  });
  after((done) => {
    rewiremock.default.disable();
    done();
  });
  it('makemigrations', (done) => {
    const test = async () => {
      const oldDIR = process.env.MICRO_DIRNAME;
      process.env.MICRO_DIRNAME = "BLA";
      const migrations = require('../src/db/migrations');
      const oldCount = fakePath.resolve.callCount;
      const oldCount2 = fakeCP.execSync.callCount;
      migrations.makemigrations();
      chai.expect(fakePath.resolve.callCount).to.be.equals(oldCount + 1);
      const lastPathArgs = fakePath.resolve.args[oldCount];
      chai.expect(fakeCP.execSync.callCount).to.be.equals(oldCount2 + 1);
      const lastCPArgs = fakeCP.execSync.args[oldCount2];
      chai.expect(lastPathArgs[0]).to.be.equals("BLA");
      chai.expect(lastCPArgs[0]).to.be.equals("npx makemigration");
      const lastCPOptions = fakeCP.execSync.args[oldCount2][1];
      chai.expect(lastCPOptions.cwd).to.be.equals("BLA");
      chai.expect(lastCPOptions.env).to.be.equals(process.env);
      chai.expect(lastCPOptions.windowsHide).to.be.equals(true);
      process.env.MICRO_DIRNAME = oldDIR;
    };
    test().then(done).catch(done);
  });
  it('migrate', (done) => {
    const test = async () => {
      const oldDIR = process.env.MICRO_DIRNAME;
      process.env.MICRO_DIRNAME = "BLA";
      const migrations = require('../src/db/migrations');
      const oldCount = fakePath.resolve.callCount;
      const oldCount2 = fakeCP.execSync.callCount;
      migrations.migrate();
      chai.expect(fakePath.resolve.callCount).to.be.equals(oldCount + 1);
      const lastPathArgs = fakePath.resolve.args[oldCount];
      chai.expect(fakeCP.execSync.callCount).to.be.equals(oldCount2 + 1);
      const lastCPArgs = fakeCP.execSync.args[oldCount2];
      chai.expect(lastPathArgs[0]).to.be.equals("BLA");
      chai.expect(lastCPArgs[0]).to.be.equals("npx sequelize db:migrate");
      const lastCPOptions = fakeCP.execSync.args[oldCount2][1];
      chai.expect(lastCPOptions.cwd).to.be.equals("BLA");
      chai.expect(lastCPOptions.env).to.be.equals(process.env);
      chai.expect(lastCPOptions.windowsHide).to.be.equals(true);
      process.env.MICRO_DIRNAME = oldDIR;
    };
    test().then(done).catch(done);
  });
  it('seed', (done) => {
    const test = async () => {
      const oldDIR = process.env.MICRO_DIRNAME;
      process.env.MICRO_DIRNAME = "BLA";
      const migrations = require('../src/db/migrations');
      const oldCount = fakePath.resolve.callCount;
      const oldCount2 = fakeCP.execSync.callCount;
      migrations.seed();
      chai.expect(fakePath.resolve.callCount).to.be.equals(oldCount + 1);
      const lastPathArgs = fakePath.resolve.args[oldCount];
      chai.expect(fakeCP.execSync.callCount).to.be.equals(oldCount2 + 1);
      const lastCPArgs = fakeCP.execSync.args[oldCount2];
      chai.expect(lastPathArgs[0]).to.be.equals("BLA");
      chai.expect(lastCPArgs[0]).to.be.equals("npx sequelize db:seed:all");
      const lastCPOptions = fakeCP.execSync.args[oldCount2][1];
      chai.expect(lastCPOptions.cwd).to.be.equals("BLA");
      chai.expect(lastCPOptions.env).to.be.equals(process.env);
      chai.expect(lastCPOptions.windowsHide).to.be.equals(true);
      process.env.MICRO_DIRNAME = oldDIR;
    };
    test().then(done).catch(done);
  });
});

