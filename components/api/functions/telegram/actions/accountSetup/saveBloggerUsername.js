import sendMessage from '../../components/sendMessage';

export default async function saveBloggerUsername(message) {
  const resp = await fetch(
    sendMessage({
      text: `blogger username is set to <b>${message.text}</b>`,
      chat_id: message.from.id,
      reply_markup: {
        inline_keyboard: [
          [{ text: 'change', callback_data: 'resetBloggerUsername' }],
        ],
      },
    })
  );
  return resp;
}
