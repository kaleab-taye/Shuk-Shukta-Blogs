import Mongoose from 'mongoose';

const userSchema = Mongoose.Schema({
  id: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  firstName: String,
  lastName: String,
  profileUrl: String,
  joinedDate: { type: Date, default: () => Date.now(), immutable: true },
  blogs: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'blog' }],
});

export const userModel =
  Mongoose.models.user || Mongoose.model('user', userSchema);
