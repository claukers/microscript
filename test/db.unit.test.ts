import { describe, it, before, after } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as rewiremock from 'rewiremock';

describe('lib.db.Database unit tests', function () {
  this.timeout(100000);
  const fakeLogger = {

  };
  const fakeSetupDBRet = {
    sequelize: {
      authenticate: sinon.fake(async () => {

      }),
      close: sinon.fake(async () => {

      })
    },
    Sequelize: null
  };
  const fakeSetupDB = sinon.fake(() => {
    return fakeSetupDBRet;
  });
  const fakeUtil = {
    getLogger: sinon.fake((name) => {
      return fakeLogger;
    }),
    checkEnvVariables: sinon.fake(() => {

    })
  };
  before((done) => {
    rewiremock.default.disable();
    rewiremock.default.enable();
    rewiremock.default.disable();
    rewiremock.default("../util/loader").with({
      setupDB: fakeSetupDB
    });
    rewiremock.default("../util").with({
      Util: fakeUtil
    });
    rewiremock.default.enable();
    done();
  });
  after((done) => {
    rewiremock.default.disable();
    done();
  });
  it('new', (done) => {
    const test = async () => {
      const oldCount1 = fakeUtil.getLogger.callCount;
      const oldCount2 = fakeUtil.checkEnvVariables.callCount;
      const oldCount3 = fakeSetupDB.callCount;
      const { Database } = require("../src/db");
      const db = new Database();
      // Util getLogger
      chai.expect(fakeUtil.getLogger.callCount).to.be.equals(oldCount1 + 1);
      chai.expect(fakeUtil.getLogger.args[oldCount1].length).to.be.equal(1);
      const loggerNameArg = fakeUtil.getLogger.args[oldCount1][0];
      chai.expect(loggerNameArg).to.be.equals("Database");
      // Util check env "DB_DROPTABLES"
      chai.expect(fakeUtil.checkEnvVariables.callCount).to.be.equals(oldCount2 + 1);
      chai.expect(fakeUtil.checkEnvVariables.args[oldCount2].length).to.be.equal(1);
      const listArg = fakeUtil.checkEnvVariables.args[oldCount2][0];
      chai.expect(listArg.length).to.be.equals(1);
      chai.expect(listArg[0]).to.be.equals("DB_DROPTABLES");
      // setupDB
      chai.expect(fakeSetupDB.callCount).to.be.equals(oldCount3 + 1);
      chai.expect(fakeSetupDB.args[oldCount3].length).to.be.equal(0);
      // check db.models to exclude "sequelize" and "Sequelize"
      chai.expect(Object.keys(db.models).length).to.be.equals(0);
      chai.expect(db.sequelize).to.be.equals(fakeSetupDBRet.sequelize);

    };
    test().then(done).catch(done);
  });
  describe("statechange", () => {
    it('invalid state', (done) => {
      const test = async () => {
        const { Database } = require("../src/db");
        const db = new Database();
        try {
          db.stateChange("bla");
          chai.expect(true).to.be.equals(false);
        } catch (e) {
          chai.expect(e.message).to.be.equals("Unknow state");
        }
      };
      test().then(done).catch(done);
    });
    it('valid states', (done) => {
      const test = async () => {
        const { Database } = require("../src/db");
        const db = new Database();
        for (const event of Database.events) {
          const handler = sinon.fake((arg) => {
            chai.expect(arg).to.be.equals(1);
          });
          db.once(event, handler);
          db.stateChange(event, 1);
          chai.expect(handler.callCount).to.be.equals(1);
        }
      };
      test().then(done).catch(done);
    });
  });
  describe('start/stop', () => {
    /*it('DB_DROPTABLES', (done) => {
      const test = async () => {
        const { Database } = require("../src/db");
        throw new Error("not implemented");
      };
      test().then(done).catch(done);
    });*/
    it('valid state', (done) => {
      const test = async () => {
        const { Database } = require("../src/db");
        const db = new Database();
        db.stateChange = sinon.fake(db.stateChange);
        const oldCount = fakeSetupDBRet.sequelize.authenticate.callCount;
        const oldCount2 = fakeSetupDBRet.sequelize.close.callCount;
        await db.start();
        chai.expect(fakeSetupDBRet.sequelize.authenticate.callCount).to.be.equals(oldCount + 1);
        chai.expect(fakeSetupDBRet.sequelize.close.callCount).to.be.equals(oldCount2);
        chai.expect(db.stateChange.callCount).to.be.equals(2);
        await db.stop();
        chai.expect(db.stateChange.callCount).to.be.equals(4);
        chai.expect(fakeSetupDBRet.sequelize.authenticate.callCount).to.be.equals(oldCount + 1);
        chai.expect(fakeSetupDBRet.sequelize.close.callCount).to.be.equals(oldCount2 + 1);
      };
      test().then(done).catch(done);
    });
  });
});
