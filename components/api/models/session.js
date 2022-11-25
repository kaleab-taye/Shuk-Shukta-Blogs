import Mongoose from 'mongoose';

const sessionSchema = Mongoose.Schema({
  id: { type: String, required: true },
  time: { type: String, required: true },
  last: { type: String, default: false },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'telegramAdmin',
    autopopulate: true,
  },
  channel: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'telegramChannel',
    autopopulate: true,
  },
});

sessionSchema.plugin(require('mongoose-autopopulate'));

export const sessionModel =
  Mongoose.models.session || Mongoose.model('session', sessionSchema);
