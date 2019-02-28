import mongoose from 'mongoose';
import User from '../../database/models/UserModel';
import * as utils from '../../utils/utils';

const { authenticate } = utils.default;

const { ObjectId } = mongoose.Types;

// Function to validate the user and create a new todo
const createTodo = async (_, { content }, ctx) => {
  const userId = authenticate(ctx);

  try {
    const user = await User.findOne({ _id: userId });

    const newTodo = { _id: new ObjectId(), content };

    user.todos.push(newTodo);

    user.save();

    return newTodo;
  } catch (err) {
    throw new Error(err);
  }
};

// Function to validate the user and edit a todo
const updateTodo = async (_, { _id, content }, ctx) => {
  const userId = authenticate(ctx);

  try {
    await User.update(
      { _id: userId, 'todos._id': _id },
      { $set: { 'todos.$.content': content } },
    );

    return { _id, content };
  } catch (err) {
    throw new Error(err);
  }
};

// Function to validate the user and delete a todo
const deleteTodo = async (_, { _id }, ctx) => {
  const userId = authenticate(ctx);

  try {
    await User.update(
      { _id: userId },
      { $pull: { todos: { _id } } },
      { multi: true },
    );

    const content = 'The content was removed';

    return { _id, content };
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createTodo,
  updateTodo,
  deleteTodo,
};
