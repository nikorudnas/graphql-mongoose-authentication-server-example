import User from '../../database/models/UserModel';
import authenticate from '../../utils/authentication';

// Function to validate the user and create a new todo
const createTodo = async (_, { todo }, ctx) => {
  const userId = authenticate(ctx);

  try {
    // Find a user with id from token
    const user = await User.findOne({ _id: userId });

    // Create new todo
    const newTodo = {
      title: todo.title,
      description: todo.description || '',
    };

    // Push the todo to users todos array
    user.todos.push(newTodo);

    user.save();

    // Return true for success
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

// Function to validate the user and edit a todo
const updateTodo = async (_, { todo }, ctx) => {
  const userId = authenticate(ctx);

  // Try finding a user with id from token and a todo with id. Then update the contect of that todo
  try {
    await User.updateOne(
      { _id: userId, 'todos._id': todo._id },
      {
        $set: {
          'todos.$.title': todo.title,
          'todos.$.description': todo.description,
          'todos.$.completed': todo.completed,
        },
      },
    );

    // Return true for success
    return true;
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

    // Return true for success
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  createTodo,
  updateTodo,
  deleteTodo,
};
