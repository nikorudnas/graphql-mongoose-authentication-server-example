import RateLimit from 'express-rate-limit';
import * as config from '../../env_variables';

const env = process.env.NODE_ENV || 'development';

const { NODE_ENV, DATABASE_URI, SESSION_SECRET, PORT } = config[env];

const CONFIG = {
  SESSION_SECRET,
  DATABASE_URI,
  DATABASE_OPTIONS: {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
  limiter: new RateLimit({
    windowMs: 15 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0, // disable delaying - full speed until the max limit is reached
  }),
  options: {
    port: PORT,
    endpoint: '/api',
    // disable playground in production
    playground: NODE_ENV === 'development' ? '/playground' : false,
  },
};

export default { ...CONFIG };
