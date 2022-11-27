import Mongoose from 'mongoose';

const sessionSchema = Mongoose.Schema({
  // id: { type: String, required: true },
  time: { type: Date, default: () => Date.now(), immutable: true },
  last: { type: String, default: false },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'telegramAdmin',
    autopopulate: true,
  },
  userId: { type: String },
  channelId: { type: String },
  channel: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'telegramChannel',
    autopopulate: true,
  },
});

sessionSchema.plugin(require('mongoose-autopopulate'));

export const sessionModel =
  Mongoose.models.session || Mongoose.model('session', sessionSchema);
