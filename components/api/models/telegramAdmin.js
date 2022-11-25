import Mongoose from 'mongoose';

const telegramAdminSchema = Mongoose.Schema({
  id: { type: String, required: true },
  user: {},
  telegramChannels: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'telegramChannel',
      autopopulate: true,
    },
  ],
});

telegramAdminSchema.plugin(require('mongoose-autopopulate'));

export const telegramAdminModel =
  Mongoose.models.telegramAdmin ||
  Mongoose.model('telegramAdmin', telegramAdminSchema);
