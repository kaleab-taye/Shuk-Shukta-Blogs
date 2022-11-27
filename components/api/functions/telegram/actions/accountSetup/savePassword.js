import { sessionModel } from '../../../../models/session';
import { telegramChannelModel } from '../../../../models/telegramChannel';

export default async function savePassword(message) {
  // update data on database
  const currentSession = await sessionModel.findOne({
    userId: message.from.id,
    last: true,
  });
  if (currentSession === null) {
    throw 'session not found';
  }

  const channel = await telegramChannelModel.findOne({
    _id: currentSession.channel._id,
  });

  channel.account.password = message.text;
  const resp0 = await channel.save();

  return true;
}
