// Import initialation modules
import { importSchema } from 'graphql-import';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import config from './config/config';

// Make Mongoose use the global promise library
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
        // Try again if connection fails
        console.log(err);
        console.log('------------------------------');
        console.log('Trying to reconnect to MongoDB shortly...');
        setTimeout(() => {
          mongoConnect();
        }, 10000);
      },
    );
}

// Make the connection
mongoConnect();

// Compose resolvers
const resolvers = {
  Query,
  Mutation,
};

// Create serer and add context header to every request
const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  context: req => ({ ...req }),
});

// Initialize the app
const app = express();

// Helmet is a HTTP security middleware
// Rate-limiter protects aganist DDoS
app.use(helmet(), config.limiter, morgan('dev'));

// Only if you're behind a reverse proxy
// (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
app.enable('trust proxy');

// Apply the express middleware to the server -instance
server.applyMiddleware({ app });

// Get port from config
const { port } = config.options;

// Open the server and start listening to connections
app.listen(config.options, () => {
  console.log(`Server running at http://localhost:${port}`);
});
