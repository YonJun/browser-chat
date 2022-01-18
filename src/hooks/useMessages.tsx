import { useEffect, useMemo, useState } from "react";
import { WatchMessages$ } from "../services/messages";
import type { Message } from "../custom-types/message";
import { uid } from "uid";
import { addMessage, hideMessage } from "../modules/chat/utils";
import { addUserContact } from "../modules/chat/utils";

interface UseMessagesProps {
  senderId: string;
  receiverId: string;
}

export const useMessages = ({ senderId, receiverId }: UseMessagesProps) => {
  const [messages, set_messages] = useState<Message[]>([]);

  useEffect(() => {
    set_messages([]);
    const subscription = WatchMessages$({ receiverId, senderId }).subscribe(
      (nextMessages) => {
        set_messages(nextMessages);
      },
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [receiverId]);

  const KEY_ID = useMemo(() => {
    if (messages.length > 0) {
      if (messages[0].senderId === senderId) {
        return `${senderId}_${receiverId}`;
      } else {
        return `${receiverId}_${senderId}`;
      }
    } else {
      return `${senderId}_${receiverId}`;
    }
  }, [receiverId, messages]);

  const onSendMessage = (m: Omit<Message, "id">) => {
    const newMessage = { ...m, id: uid(5) };

    set_messages((currentMessages) => {
      return [...currentMessages, newMessage];
    });
    addMessage({ KEY_ID, newMessage });
    addUserContact(senderId, receiverId);
    addUserContact(receiverId, senderId);
  };

  const handleHideMessage = (messageId: string) => {
    hideMessage(KEY_ID, messageId);
  };

  return { messages, onSendMessage, handleHideMessage };
};
