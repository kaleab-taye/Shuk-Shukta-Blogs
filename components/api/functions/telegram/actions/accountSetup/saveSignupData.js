import sendMessage from '../../components/sendMessage';

export default async function saveSignupData(message) {
  
  const resp1 = await fetch(
    sendMessage({
      text: 'Congrats you have successfully setup your <b><a href="https://shuk-shukta-blogs.vercel.app/">Shuk-Shukta Blogs</a></b> blogger account. click the <b>start publishing</b> button to start publishing your channel posts to the website.',
      chat_id: message.from.id,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'start publishing',
              callback_data: 'startPublishingToWebsite',
            },
          ],
        ],
      },
    })
  );
  return resp1;
}
