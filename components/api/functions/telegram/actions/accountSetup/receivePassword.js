import sendMessage from '../../components/sendMessage';
import { textContentData } from '../../textContentData';

export default async function receivePassword(message) {
  const resp1 = await fetch(
    sendMessage({
      text: textContentData.accountSetup.passwordQuery,
      chat_id: message.from.id,
      reply_markup: {
        force_reply: true,
        input_field_placeholder: 'password',
      },
    })
  );
  return resp1;
}
