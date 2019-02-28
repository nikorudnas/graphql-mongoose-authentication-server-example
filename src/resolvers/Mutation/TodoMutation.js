import mongoose from 'mongoose';
import User from '../../database/models/UserModel';
import authenticate from '../../utils/authentication';

const { ObjectId } = mongoose.Types;

// Function to validate the user and create a new todo
const createTodo = async (_, { content }, ctx) => {
  const userId = authenticate(ctx);

  try {
    // Find a user with id from token
    const user = await User.findOne({ _id: userId });

    // Create new todo
    const newTodo = { _id: new ObjectId(), content };

    // Push the todo to users todos array
    user.todos.push(newTodo);

    user.save();

    // Return the new todo
    return newTodo;
  } catch (err) {
    throw new Error(err);
  }
};

// Function to validate the user and edit a todo
const updateTodo = async (_, { _id, content }, ctx) => {
  const userId = authenticate(ctx);

  // Try finding a user with id from token and a todo with id. Then update the contect of that todo
  try {
    await User.update(
      { _id: userId, 'todos._id': _id },
      { $set: { 'todos.$.content': content } },
    );

    // Return user id and new content
    return { _id, content };
  } catch (err) {
    throw new Error(err);
  }
};

// Function to validate the user and delete a todo
const deleteTodo = async (_, { _id }, ctx) => {
  const userId = authenticate(ctx);

  // Try finding a user with and id from token and then try to remove a todo with id from the array of todo's
  try {
    await User.update(
      { _id: userId },
      { $pull: { todos: { _id } } },
      { multi: true },
    );

    const content = 'The content was removed';

    // Return user id and message
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
