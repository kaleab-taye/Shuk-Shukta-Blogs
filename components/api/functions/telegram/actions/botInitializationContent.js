import sendMessage from '../components/sendMessage';

export default async function BotInitializationContent(message) {
  try {
    const userId = message.chat.id;

    // welcome text
    const welcomeText = `Welcome to <b><a href="https://shuk-shukta-blogs.vercel.app/">Shuk-Shukta Blogs</a></b>%0aA world of free speech and literacy!`;
    const resp = await fetch(
      sendMessage({ text: welcomeText, chat_id: userId })
    );

    // guidance
    const guidance = `<b>HOW DOES IT WORK?</b>%0a%0a1. add this bot to your channel %0a2. send <b>your channel username</b>(with format /username/@username)%0afor example /user/@Shuk_Shukta_Blogs_bot%0a3. setup account password and username for the blogging site %0a4. everything that will be posted on your channel will be posted as a blog on our website. %0a%0a<b>NB</b>%0amake sure to go to the website and remove any notifications you will post for your members`;
    const resp2 = await fetch(sendMessage({ text: guidance, chat_id: userId }));
  } catch (error) {
    console.log(
      'error in bot initialization start',
      error,
      'error in bot initialization end'
    );
  }
}
