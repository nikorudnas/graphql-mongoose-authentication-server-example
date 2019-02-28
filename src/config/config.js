import RateLimit from 'express-rate-limit';
import * as config from '../../env_variables';

// Set the env as development unless else specified
const env = process.env.NODE_ENV || 'development';

// Import the variables from the matching env from config -file
const { NODE_ENV, DATABASE_URI, SESSION_SECRET, PORT } = config[env];

// Create a config object used for the initialization of the server
const CONFIG = {
  SESSION_SECRET,
  DATABASE_URI,
  DATABASE_OPTIONS: {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
  limiter: new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
  }),
  options: {
    port: PORT,
    endpoint: '/api',
    // Disable playground in production
    playground: NODE_ENV === 'development' ? '/playground' : false,
  },
};

export default { ...CONFIG };
