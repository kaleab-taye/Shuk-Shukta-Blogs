export default async function saveTitle(message) {
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

  channel.account.title = message.text;
  const resp0 = await channel.save();

  // sending back response
  const resp = await fetch(
    sendMessage({
      text: `blog title is set to <b>${message.text}</b>`,
      chat_id: message.from.id,
      reply_markup: {
        inline_keyboard: [
          [{ text: 'change', callback_data: 'resetBlogTitle' }],
        ],
      },
    })
  );
  return resp;
}