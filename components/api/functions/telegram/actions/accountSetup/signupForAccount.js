import { sessionModel } from '../../../../models/session';
import { telegramChannelModel } from '../../../../models/telegramChannel';
import { userModel } from '../../../../models/user';
import { createNewUser } from '../../../user/createNewUser';

export default async function signupForAccount(callbackQuery) {
  try {
    const currentSession = await sessionModel.findOne({
      userId: callbackQuery.from.id,
      last: true,
    });
    if (currentSession === null) {
      throw 'session not found';
    }

    const channel = await telegramChannelModel.findOne({
      _id: currentSession.channel._id,
    });
    if (channel === null) {
      throw 'session not found';
    }

    const signingUser = {
      userName: channel.account.username,
      password: channel.account.password,
      fullName: channel.account.name,
      email: channel.account.email,
    };
    let response = await createNewUser(signingUser);
    return true;
  } catch (error) {
    throw error;
  }
}
