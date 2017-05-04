import 'babel-polyfill'
import assert from 'assert';
import context, { contextLoader } from '../../../../src/app/context';

before(function(done){
  contextLoader.ready(done);
})

describe('UserService', () => {
  it('#getUser', async () => {
    const { UserService } = context.services
    try {
      const users = await UserService.find()
      assert.equal(0, users.length);
    } catch (e) {
      assert.equal(null, e);
    }
  })
})