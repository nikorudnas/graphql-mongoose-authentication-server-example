import mongoose from 'mongoose';

// Todo schema
const todoSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('todo', todoSchema);
