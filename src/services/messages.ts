import { Observable } from "rxjs";
import { getMessages } from "../modules/chat/utils";
import type { Message } from "../custom-types/message";

interface WatchMessagesProps {
  senderId: string;
  receiverId: string;
}
export const WatchMessages$ = ({
  senderId,
  receiverId,
}: WatchMessagesProps) => {
  return new Observable<Message[]>(function subscribe(subscriber) {
    let oldMessages: Message[] = [];

    let intervalId = setInterval(() => {
      let messages: Message[] = [];

      if (getMessages(`${senderId}_${receiverId}`).length > 0) {
        messages = getMessages(`${senderId}_${receiverId}`);
      }
      if (getMessages(`${receiverId}_${senderId}`).length > 0) {
        messages = getMessages(`${receiverId}_${senderId}`);
      }

      if (JSON.stringify(oldMessages) !== JSON.stringify(messages)) {
        oldMessages = messages;
        subscriber.next(messages);
      }
    }, 2000);

    return function unsubscribe() {
      clearInterval(intervalId);
    };
  });
};

interface WatchGroupMessagesProps {
  groupId: string;
}
export const WatchGroupMessages$ = ({ groupId }: WatchGroupMessagesProps) => {
  return new Observable<Message[]>(function subscribe(subscriber) {
    let oldMessages: Message[] = [];

    let intervalId = setInterval(() => {
      let messages: Message[] = [];

      if (getMessages(groupId).length > 0) {
        messages = getMessages(groupId);
      }

      if (JSON.stringify(oldMessages) !== JSON.stringify(messages)) {
        oldMessages = messages;
        subscriber.next(messages);
      }
    }, 2000);

    return function unsubscribe() {
      clearInterval(intervalId);
    };
  });
};
