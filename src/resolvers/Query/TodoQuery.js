import User from '../../database/models/UserModel';
import * as utils from '../../utils/utils';

const { authenticate } = utils.default;

const allTodos = async (_, __, ctx) => {
  const userId = authenticate(ctx);

  try {
    // Use lean because we don't need the mongoose object returned
    const user = await User.findOne({ _id: userId }).lean();

    return user.todos;
  } catch (err) {
    throw new Error(err);
  }
};

const Todo = async (_, { _id }, ctx) => {
  const userId = authenticate(ctx);

  try {
    const user = await User.findOne({ _id: userId }).lean();

    const todo = user.todos.find(x => x._id.toString() === _id);

    if (!todo) {
      throw new Error('Cannot find the todo!');
    }

    return todo;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  allTodos,
  Todo,
};
