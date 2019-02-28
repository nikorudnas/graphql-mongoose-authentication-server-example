import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../database/models/UserModel';
import config from '../../config/config';

// Function to validate the input and create a new user. Returns a JWT
const signup = async (_, { email, password }) => {
  try {
    let user = await User.findOne({ email }).lean();

    if (user) {
      throw new Error('Email is already taken');
    }

    const _password = await hash(password, 10);
    user = await new User({ email, password: _password }).save();

    const token = sign({ userId: user._id }, config.SESSION_SECRET);

    return { token, user };
  } catch (err) {
    throw new Error(err);
  }
};

// Function to validate the user and login in. Returns a JWT
const login = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ email }, '+password').lean();

    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    user.password = undefined;

    return {
      token: sign({ userId: user._id }, config.SESSION_SECRET),
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  signup,
  login,
};
