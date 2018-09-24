import { importSchema } from 'graphql-import';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import config from './config/config';

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

function mongoConnect() {
  // Set up default mongoose connection
  mongoose
    .connect(
      config.DATABASE_URI,
      config.DATABASE_OPTIONS,
    )
    .then(
      () => {
        console.log('MongoDB connection established!');
      },
      err => {
        console.log(err);
        console.log('------------------------------');
        console.log('Trying to reconnect to MongoDB shortly...');
        setTimeout(() => {
          mongoConnect();
        }, 10000);
      },
    );
}

mongoConnect();

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  context: req => ({ ...req }),
});

const app = express();

// HTTP security middleware
// Apply rate limiter to all requests
app.use(helmet(), config.limiter, morgan('dev'));

// Only if you're behind a reverse proxy
// (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
app.enable('trust proxy');

server.applyMiddleware({ app });

const { port } = config.options;
app.listen(config.options, () => {
  console.log(`Server running at http://localhost:${port}`);
});
