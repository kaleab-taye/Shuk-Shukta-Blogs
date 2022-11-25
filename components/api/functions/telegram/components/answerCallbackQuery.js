export default function answerCallbackQuery({
  callback_query_id,
  text,
  show_alert = false,
}) {
  const telegramUrl = process.env.telegramUrl;
  let queries = [];
  if (callback_query_id) {
    queries.push(`callback_query_id=${callback_query_id}`);
  }
  if (text) {
    queries.push(`text=${text}`);
  }
  if (show_alert) {
    queries.push(`show_alert=${show_alert}`);
  }

  let urlPortion = `${telegramUrl}/answerCallbackQuery?`;
  // adding the queries
  queries.map((cont) => {
    urlPortion = urlPortion + `&${cont}`;
  });

  return urlPortion;
}
