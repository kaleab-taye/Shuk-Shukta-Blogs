import mongoose from 'mongoose';
import { sessionModel } from '../../../../models/session';
import { telegramAdminModel } from '../../../../models/telegramAdmin';
import { telegramChannelModel } from '../../../../models/telegramChannel';

export default async function setSession(body) {
  const testContent = {
    update_id: 869174453,
    my_chat_member: {
      chat: {
        id: -1001216586164,
        title: 'shuk-shukta-channel',
        username: 'shuk_shukta_blogs_channel',
        type: 'channel',
      },
      from: {
        id: 308921082,
        is_bot: false,
        first_name: 'kaleab',
        username: 'kaleab_taye',
        language_code: 'en',
      },
      date: 1669305085,
      old_chat_member: { user: [Object], status: 'kicked', until_date: 0 },
      new_chat_member: {
        user: [Object],
        status: 'administrator',
        can_be_edited: false,
        can_manage_chat: true,
        can_change_info: true,
        can_post_messages: true,
        can_edit_messages: true,
        can_delete_messages: true,
        can_invite_users: true,
        can_restrict_members: true,
        can_promote_members: false,
        can_manage_video_chats: true,
        is_anonymous: false,
        can_manage_voice_chats: true,
      },
    },
  };

  const userId = body.my_chat_member.from.id;
  const userData = body.my_chat_member.from;

  const channelId = body.my_chat_member.chat.id;
  const channelChat = body.my_chat_member.chat;

  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    // setup admin user
    let user = await telegramAdminModel.findOne({ id: userId });

    if (user === null) {
      const adminUser = {
        id: userId,
        user: userData,
        telegramChannels: [],
      };
      user = await telegramAdminModel.create(adminUser);
    }

    // setup the joined channel
    let channel = await telegramChannelModel.findOne({ id: channelId });

    if (channel === null) {
      const channelData = {
        id: channelId,
        channel: channelChat,
        user: user._id,
      };
      channel = await telegramChannelModel.create(channelData);
    }
    user.telegramChannels.push(channel._id);
    const newUser = await user.save();

    // setup the session
    let oldSession = await sessionModel.findOne({ user: user._id, last: true });
    if (oldSession !== null) {
      oldSession.last = false;
      const updatedOldSession = await oldSession.save();
    }

    const currentTime = Date.now();
    let newSession = await sessionModel.create({
      time: currentTime,
      last: true,
      user: user._id,
      channel: channel._id,
    });
    //   const time= { type: String, required: true },
    // last: { type: String, default: false },
    // user: {
    //   type: Mongoose.Schema.Types.ObjectId,
    //   ref: 'telegramAdmin',
    //   autopopulate: true,
    // },
    // channel: {
    //   type: Mongoose.Schema.Types.ObjectId,
    //   ref: 'telegramChannel',
    //   autopopulate: true,
    // },

    // return response;
    // console.log('ss', newSession);
  } catch (error) {
    console.error(error);
    throw error;
  }

  return;
}
