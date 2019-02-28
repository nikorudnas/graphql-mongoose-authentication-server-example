import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../../database/models/UserModel';
import config from '../../config/config';

// Function to validate the input and create a new user. Returns a JWT
const signup = async (_, { email, password }) => {
  try {
    // Check if the user exists
    let user = await User.findOne({ email }).lean();

    if (user) throw new Error('Email is already taken');

    // Check if the user exists hash the typed password
    const _password = await hash(password, 10);

    // Create new user
    user = await new User({ email, password: _password }).save();

    // Sign a JWT
    const token = sign({ userId: user._id }, config.SESSION_SECRET);

    // Return the JWT and some useful user information
    return { token, user };
  } catch (err) {
    throw new Error(err);
  }
};

// Function to validate the user and login in. Returns a JWT
const login = async (_, { email, password }) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email }, '+password').lean();

    if (!user) throw new Error('No such user found');

    // Validate the user information
    const valid = await compare(password, user.password);
    if (!valid) throw new Error('Invalid password');

    // Remove password from returning user -object
    user.password = undefined;

    // Sign new token and return JWT + user
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
