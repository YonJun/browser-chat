import { useEffect, useState } from "react";
import type { Message } from "../custom-types/message";
import { uid } from "uid";
import {
  addGroupContact,
  addMessage,
  hideMessage,
} from "../modules/chat/utils";
import { WatchGroupMessages$ } from "../services/messages";

interface UseGroupMessagesProps {
  senderId: string;
  groupId: string;
}
export const useGroupsMessages = ({
  senderId,
  groupId,
}: UseGroupMessagesProps) => {
  const [data, set_data] = useState<Message[]>([]);

  useEffect(() => {
    set_data([]);
    const subscription = WatchGroupMessages$({ groupId }).subscribe(
      (nextMessages) => {
        set_data(nextMessages);
      },
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [groupId]);

  const handleSendMessage = (m: Omit<Message, "id">) => {
    const newMessage = { ...m, id: uid(5) };

    addMessage({ KEY_ID: groupId, newMessage });

    addGroupContact(senderId, groupId);
  };

  const handleHideMessage = (messageId: string) => {
    hideMessage(groupId, messageId);
  };

  return { messages: data, handleSendMessage, handleHideMessage };
};
