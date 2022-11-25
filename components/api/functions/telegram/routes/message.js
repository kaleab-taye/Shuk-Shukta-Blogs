import BotInitializationContent from '../actions/botInitializationContent';
import replyRoute from './replyRoute';

export default function messageRoute(message) {
  if ('reply_to_message' in message) {
    replyRoute(message);
  } else if ('text' in message && message.text === '/start') {
    BotInitializationContent(message);
  }
}
