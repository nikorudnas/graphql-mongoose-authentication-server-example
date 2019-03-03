import mongoose from 'mongoose';
import todoSchema from './TodoModel';

// User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    // Don't return password unless specified to
    password: { type: String, select: false },
    todos: [todoSchema.schema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('user', userSchema);
