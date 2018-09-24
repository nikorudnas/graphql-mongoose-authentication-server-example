import { verify } from 'jsonwebtoken';
import config from '../config/config';

const authenticate = context => {
  const Authorization = context.req.get('authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = verify(token, config.SESSION_SECRET);
    return userId;
  }

  throw new Error('Not authorized');
};

export default {
  authenticate,
};
