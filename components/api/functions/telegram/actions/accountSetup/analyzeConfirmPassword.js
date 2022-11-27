import { sessionModel } from '../../../../models/session';
import { telegramChannelModel } from '../../../../models/telegramChannel';
import sendMessage from '../../components/sendMessage';

export default async function analyzeConfirmPassword(message) {
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
  if (channel.account.password === message.text) {
    const resp = await fetch(
      sendMessage({
        chat_id: message.from.id,
        text: `Your data is set as the following %0a%0aBlogger Name ${channel.account.name} %0aBlogger Username ${channel.account.username} %0aEmail ${channel.account.email} %0a%0ayou can go to our website and edit this data anytime.`,
      })
    );
    return true;
  } else {
    return false;
  }
}
