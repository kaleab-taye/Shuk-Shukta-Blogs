import sendMessage from "../../components/sendMessage";
import { textContentData } from "../../textContentData";

export default async function receiveBloggerUsername(message) {
  const resp1 = await fetch(
    sendMessage({
      text: textContentData.accountSetup.usernameQuery,
      chat_id: message.from.id,
      reply_markup: {
        force_reply: true,
        input_field_placeholder: 'blogger username',
      },
    })
  );
  return resp1;
}
