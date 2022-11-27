import Mongoose from 'mongoose';

const telegramChannelSchema = Mongoose.Schema({
  id: { type: String, required: true },
  channel: {},
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'telegramAdmin',
    autopopulate: true,
  },
  account: {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    blogTitle: { type: String },
  },
});

telegramChannelSchema.plugin(require('mongoose-autopopulate'));

export const telegramChannelModel =
  Mongoose.models.telegramChannel ||
  Mongoose.model('telegramChannel', telegramChannelSchema);
