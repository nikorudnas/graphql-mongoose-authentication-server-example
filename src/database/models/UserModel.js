import mongoose from 'mongoose';

// User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  // Don't return password unless specified to
  password: { type: String, select: false },
  todos: [
    {
      content: { type: String },
    },
  ],
});

export default mongoose.model('user', userSchema);
