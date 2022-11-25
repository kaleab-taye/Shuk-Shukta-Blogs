import sendMessage from "../../components/sendMessage";
import { textContentData } from "../../textContentData";

export default async function receiveBloggerName(callbackQuery) {
  const text1 = textContentData.accountSetup.fullNameQuery;
    const resp1 = await fetch(
      sendMessage({
        text: text1,
        chat_id: callbackQuery.from.id,
        reply_markup: {
          force_reply: true,
          input_field_placeholder: 'blogger name',
        },
      })
    );
    return resp1;
}
