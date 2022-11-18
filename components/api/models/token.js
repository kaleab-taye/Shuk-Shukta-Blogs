import Mongoose from 'mongoose';

const tokenSchema = Mongoose.Schema({
  userId: String,
  token: String,
});

export const tokenModel =
  Mongoose.models.token || Mongoose.model('token', tokenSchema);
