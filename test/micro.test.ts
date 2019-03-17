import { describe, it, before } from 'mocha';
import * as chai from 'chai';
import * as lib from '../src';
import * as path from 'path';

describe('micro amarilla', function () {
  this.timeout(100000);
  it('micro start 2 isolated!', (done) => {
    const test = async () => {
      const micro = new lib.Micro({
        name: "Micro 1",
        service: path.resolve(__dirname, '..', 'example', 'src', 'microservice'),
        nodes: 1
      });
      const micro2 = new lib.Micro({
        name: "Micro 2",
        service: path.resolve(__dirname, '..', 'example', 'src', 'microservice'),
        nodes: 1
      });
      await micro2.start();
      await micro.start();

      await micro.stop();
      await micro2.stop();
    };
    test().then(done).catch(done);
  });
});
