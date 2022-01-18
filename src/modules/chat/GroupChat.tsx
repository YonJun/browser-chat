import React, { useEffect } from "react";
import { ChatHistory } from "./ChatHistory";
import { useParams } from "react-router-dom";
import { userStore } from "../../global-stores/userStore";
import { findGroup } from "./utils";
import { useGroupsMessages } from "./../../hooks/useGroupMessages";
import { APP_NAME } from "../../constants/app";
import { Box } from "@mui/material";

export function GroupChat() {
  const { idGroup: groupId = "" } = useParams<"idGroup">();

  const { id: senderId } = userStore((s) => s);

  const groupInfo = findGroup(groupId);
  const { messages, handleSendMessage, handleHideMessage } = useGroupsMessages({
    senderId,
    groupId,
  });

  useEffect(() => {
    if (groupInfo) {
      document.title = `${APP_NAME} | ${groupInfo.name}`;
    } else {
      document.title = `${APP_NAME} | ${groupId}`;
    }
  }, [groupInfo, groupId]);

  if (groupInfo) {
    return (
      <ChatHistory
        messages={messages}
        onSentMessage={(content) => {
          handleSendMessage({ receiverId: groupId, senderId, content });
        }}
        title={`En ${groupInfo.name}`}
        onDeleteMessage={(mId) => {
          handleHideMessage(mId);
        }}
      />
    );
  }
  return <Box p="var(--spacing-2)">Grupo no encontrado</Box>;
}
