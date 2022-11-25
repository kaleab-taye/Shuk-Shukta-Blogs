export default function sendMessage({
  text,
  parse_mode = 'HTML',
  chat_id,
  reply_markup,
}) {
  const telegramUrl = process.env.telegramUrl;
  let queries = [];
  if (parse_mode) {
    queries.push(`parse_mode=${parse_mode}`);
  }
  if (text) {
    queries.push(`text=${text}`);
  }
  if (chat_id) {
    queries.push(`chat_id=${chat_id}`);
  }
  if (reply_markup) {
    try {
      queries.push(`reply_markup=${JSON.stringify(reply_markup)}`);
    } catch (error) {
      queries.push(`reply_markup=${reply_markup}`);
    }
  }

  let urlPortion = `${telegramUrl}/sendMessage?`;
  // adding the queries
  queries.map((cont) => {
    urlPortion = urlPortion + `&${cont}`;
  });

  return urlPortion;
}
