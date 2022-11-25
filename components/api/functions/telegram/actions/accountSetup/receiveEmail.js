import sendMessage from "../../components/sendMessage";
import { textContentData } from "../../textContentData";

export default async function receiveEmail(message) {
  const resp1 = await fetch(
    sendMessage({
      text: textContentData.accountSetup.emailQuery,
      chat_id: message.from.id,
      reply_markup: {
        force_reply: true,
        input_field_placeholder: 'blogger email',
      },
    })
  );
  return resp1;
}
