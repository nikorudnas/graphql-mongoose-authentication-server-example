import mongoose from 'mongoose';
import User from '../../database/models/UserModel';

module.exports.setupDB = () => {
  const databaseLink = 'mongodb://localhost/graphql-demo_test';

  const databaseConfig = {
    keepAlive: true,
    reconnectTries: 30,
    useCreateIndex: true,
    useNewUrlParser: true,
  };

  return mongoose
    .connect(databaseLink, databaseConfig)
    .then(
      async () => {
        // Clear all users
        const promises = [User.deleteMany().exec()];

        await Promise.all(promises);

        // Create one user
        const user = new User({
          email: 'qwe@qwe.com',
          password: 'qweqwe',
        });
        return user.save().catch(error => {
          console.log(error);
        });
      },
      err => {
        console.log(err);
        return err;
      },
    )
    .catch(e => {
      console.log(e);
      return e;
    });
};
