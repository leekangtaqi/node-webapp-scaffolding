import http from 'http';
import assert from 'assert';

import '../src/index.js';

describe('Example Node Server', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3000/user', res => {
      console.warn(res.statusMessage)
      assert.equal(200, res.statusCode);
      done();
    });
  });
});