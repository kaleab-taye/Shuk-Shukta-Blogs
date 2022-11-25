import sendMessage from '../../components/sendMessage';
import { textContentData } from '../../textContentData';

export default async function receiveConfirmPassword(message) {
  const resp1 = await fetch(
    sendMessage({
      text: textContentData.accountSetup.retryPasswordQuery,
      chat_id: message.from.id,
      reply_markup: {
        force_reply: true,
        input_field_placeholder: 'confirm password',
      },
    })
  );
  return resp1;
}
