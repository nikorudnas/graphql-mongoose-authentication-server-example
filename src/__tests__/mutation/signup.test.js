// const app = require('../../index');
const { setupDB } = require('../utils/setupDB');

describe('Signup mutation', () => {
  beforeAll(async () => {
    // Clear database and create one user
    await setupDB();
  });

  describe('Create user', () => {
    test('should return token', async done => {
      // Not actual mutation, just a dummy
      const newUser = {
        username: 'asd@asd.com',
        password: 'qweqwe',
      };
      expect(newUser.username).toEqual('asd@asd.com');
      done();
    });
  });
});
