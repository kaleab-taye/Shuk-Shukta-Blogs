import accountSetup from '../actions/accountSetup';
import tagRemover from '../other/tagRemover';
import { textContentData } from '../textContentData';

export default function replyRoute(message) {
  let messageType = '';
  // determine the purpose of the reply
  Object.keys(textContentData.accountSetup).map((item) => {
    if (
      tagRemover(textContentData.accountSetup[item]) ===
      message.reply_to_message.text
    ) {
      messageType = 'accountSetup';
    }
  });
  //
  if (messageType === 'accountSetup') {
    accountSetup(message);
  }
}
