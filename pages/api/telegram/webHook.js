// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import BotInitializationContent from '../../../components/api/functions/telegram/actions/botInitializationContent';

import { Markup, Telegraf } from 'telegraf';
import Message from '../../../components/api/functions/telegram/components/sendMessage';
import NewChannelJoined from '../../../components/api/functions/telegram/actions/NewChannelJoined';
import CallbackQueryRoute from '../../../components/api/functions/telegram/routes/callbackQuery';
import messageRoute from '../../../components/api/functions/telegram/routes/message';
// import { button } from 'telegraf/typings/markup';

export default async function handler(req, res) {
  const { body } = req;

  console.log('incoming request', body, '*******');
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
  
  try {
    // new channel joined intro
    if (
      'my_chat_member' in body &&
      'new_chat_member' in body.my_chat_member &&
      'status' in body.my_chat_member.new_chat_member &&
      body.my_chat_member.new_chat_member.status === 'administrator'
    ) {
      NewChannelJoined(body);
    }
    // currently testing feature
    else if (
      'message' in body &&
      'text' in body.message &&
      body.message.text === '/test'
    ) {
      NewChannelJoined(testContent);
    }
    // callback route
    else if ('callback_query' in body) {
      CallbackQueryRoute(body.callback_query);
    }
    // message route
    else if ('message' in body) {
      messageRoute(body.message);
    } else {
      console.log('nothing found');
    }
  } catch (error) {
    console.log('err', error);
  }
  res.end();
}
