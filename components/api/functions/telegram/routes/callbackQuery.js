import receiveBloggerName from '../actions/accountSetup/receiveBloggerName';
import receiveBloggerUsername from '../actions/accountSetup/receiveBloggerUsername';
import receiveEmail from '../actions/accountSetup/receiveEmail';
import answerCallbackQuery from '../components/answerCallbackQuery';
import sendMessage from '../components/sendMessage';
import { textContentData } from '../textContentData';

export default async function CallbackQueryRoute(callbackQuery) {
  if (callbackQuery.data === 'sureGetMeAnAccount') {
    const resp = await fetch(
      sendMessage({
        text: `Carefully answer the following questions (<i>this will be you're channel's blogger profile</i>)`,
        chat_id: callbackQuery.from.id,
      })
    );
    const resp1 = await receiveBloggerName(callbackQuery);
  } else if (callbackQuery.data === 'resetBloggerName') {
    const resp1 = await receiveBloggerName(callbackQuery);
  } else if (callbackQuery.data === 'resetBloggerUsername') {
    const resp1 = await receiveBloggerUsername(callbackQuery);
  } else if (callbackQuery.data === 'resetBloggerEmail') {
    const resp1 = await receiveEmail(callbackQuery);
  } else if (callbackQuery.data === 'startPublishingToWebsite') {
    
    const resp1 = await signupForAccount(callbackQuery);
  } 
}

// startPublishingToWebsite