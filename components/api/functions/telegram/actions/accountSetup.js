import sendMessage from '../components/sendMessage';
import tagRemover from '../other/tagRemover';
import { textContentData } from '../textContentData';
import analyzeConfirmPassword from './accountSetup/analyzeConfirmPassword';
import receiveBloggerUsername from './accountSetup/receiveBloggerUsername';
import receiveConfirmPassword from './accountSetup/receiveConfirmPassword';
import receiveEmail from './accountSetup/receiveEmail';
import receivePassword from './accountSetup/receivePassword';
import saveBloggerName from './accountSetup/saveBloggerName';
import saveBloggerUsername from './accountSetup/saveBloggerUsername';
import saveEmail from './accountSetup/saveEmail';
import savePassword from './accountSetup/savePassword';
import saveSignupData from './accountSetup/saveSignupData';

export default async function accountSetup(message) {
  // replied blogger name
  if (
    message.reply_to_message.text ===
    tagRemover(textContentData.accountSetup.fullNameQuery)
  ) {
    const resp = await saveBloggerName(message);
    const resp1 = await receiveBloggerUsername(message);
  }
  //   replied blogger username
  else if (
    message.reply_to_message.text ===
    tagRemover(textContentData.accountSetup.usernameQuery)
  ) {
    const resp = await saveBloggerUsername(message);
    const resp1 = await receiveEmail(message);
  }
  //   replied blogger email
  else if (
    message.reply_to_message.text ===
    tagRemover(textContentData.accountSetup.emailQuery)
  ) {
    const resp = await saveEmail(message);
    const resp1 = await receivePassword(message);
  }
  //   replied blogger password
  else if (
    message.reply_to_message.text ===
    tagRemover(textContentData.accountSetup.passwordQuery)
  ) {
    const resp = await savePassword(message);
    const resp1 = await receiveConfirmPassword(message);
  }
  //   replied blogger confirm password
  else if (
    message.reply_to_message.text ===
    tagRemover(textContentData.accountSetup.retryPasswordQuery)
  ) {
    const resp = await analyzeConfirmPassword(message);
    if (!true) {
      const resp0 = await fetch(
        sendMessage({
          text: "your password doesn't match",
          chat_id: message.from.id,
        })
      );
      const resp1 = await receivePassword(message);
    } else {
        const resp2 = await saveSignupData(message)
    }
    
  }
}
