import sendMessage from '../components/sendMessage';
import setSession from './database/setUserChannelSession';

export default async function NewChannelJoined(body) {
  try {

    const session = setSession(body)

    const adminUser = body.my_chat_member.from;
    const chat = body.my_chat_member.chat;

    // welcome text
    const text1 = `Hello <b>${adminUser.first_name}</b> you just added our bot to your channel <b><a href="https://t.me/${chat.username}">${chat.title}</a></b>`;
    const resp1 = await fetch(
      sendMessage({ text: text1, chat_id: adminUser.id })
    );

    // confirm if user would like to create new account for the blogging site
    const text2 = `Would you like to be part of our blogging website and publish what you post on your channel ?`;
    const text3 = `Would you like to setup you blogger account?`;
    const resp2 = await fetch(
      sendMessage({
        text: text3,
        chat_id: adminUser.id,
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Yes', callback_data: 'sureGetMeAnAccount' },
              { text: 'No', callback_data: 'noAccountNeeded' },
            ],
          ],
        },
      })
    );
  } catch (error) {
    console.log('error in new channel joined', error);
  }
}

// export default async function handler(req, res) {
//     const { body } = req;
//     console.log('incoming request', body);
//     try {
//       if (body.message.text === '/start') {
//         BotInitializationContent(body);
//       } else if (body.my_chat_member.new_chat_member.status !== 'kicked') {
//         // new channel joined intro
//         NewChannelJoined(body)
//       }
//     } catch (error) {
//       console.log('err', error);
//     }
//     res.end();
//   }
