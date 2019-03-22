import { describe, it, before, after } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as rewiremock from 'rewiremock';

describe('lib.Util.parseOptions unit tests', function () {
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
  it('simple valid check no_extra', (done) => {
    const test = async () => {
      const { Util } = require("../src/util/util");
      const ret = Util.parseOptions("argName", {
        number: 1,
        string: "string",
        boolean: true,
        object: {

        },
        stringArray: ["", ""],
        numberArray: [1, 2, 3]
      }, [
          { name: "number", type: "number", required: true },
          { name: "string", type: "string", required: true },
          { name: "boolean", type: "boolean", required: true },
          { name: "object", type: "object", required: true },
          { name: "stringArray", type: "array", arrayType: "string", required: true },
          { name: "numberArray", type: "array", arrayType: "number", required: true }
        ], "no_extra");
      chai.expect(Object.keys(ret).length).to.be.equals(6);
      chai.expect(ret.number).to.be.equals(1);
      chai.expect(ret.string).to.be.equals("string");
      chai.expect(ret.boolean).to.be.equals(true);
      chai.expect(typeof ret.object).to.be.equals("object");
      chai.expect(ret.stringArray.length).to.be.equals(2);
      chai.expect(ret.numberArray.length).to.be.equals(3);
    };
    test().then(done).catch(done);
  });
  it('simple invalid number check no_extra', (done) => {
    const test = async () => {
      try {
        const { Util } = require("../src/util/util");
        Util.parseOptions("argName", {
          number: "number",
          string: "string",
          boolean: true,
          object: {

          },
          stringArray: ["", ""],
          numberArray: [1, 2, 3]
        }, [
            { name: "number", type: "number", required: true },
            { name: "string", type: "string", required: true },
            { name: "boolean", type: "boolean", required: true },
            { name: "object", type: "object", required: true },
            { name: "stringArray", type: "array", arrayType: "string", required: true },
            { name: "numberArray", type: "array", arrayType: "number", required: true }
          ], "no_extra");
        chai.expect(false).to.be.equals(true);
      } catch (e) {
        chai.expect(e.message).to.be.equals("argName.number not number");
      }
    };
    test().then(done).catch(done);
  });
});
