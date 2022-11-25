import sendMessage from "../../components/sendMessage";

export default async function saveBloggerName(message) {
    const resp = await fetch(
        sendMessage({
          text: `blogger name is set to <b>${message.text}</b>`,
          chat_id: message.from.id,
          reply_markup: {
            inline_keyboard: [
              [{ text: 'change', callback_data: 'resetBloggerName' }],
            ],
          },
        })
      );

      return resp;
}
