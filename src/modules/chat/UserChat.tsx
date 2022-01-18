import React, { useEffect } from "react";
import { ChatHistory } from "./ChatHistory";
import { useParams } from "react-router-dom";
import { APP_NAME } from "./../../constants/app";
import { userStore } from "./../../global-stores/userStore";
import { useMessages } from "./../../hooks/useMessages";
import { getUserInfoById } from "./utils";
import { Box } from "@mui/material";

export function UserChat() {
  const { nickname, id: senderId } = userStore((s) => s);
  const { idUser: receiverId = "" } = useParams<"idUser">();
  const userInfo = getUserInfoById(receiverId);
  const { messages, onSendMessage, handleHideMessage } = useMessages({
    senderId,
    receiverId,
  });

  useEffect(() => {
    if (userInfo) {
      document.title = `${APP_NAME} | ${userInfo.nickname}`;
    } else {
      document.title = `${APP_NAME} | ${receiverId}`;
    }
  }, [userInfo, receiverId]);

  if (userInfo) {
    return (
      <ChatHistory
        messages={messages}
        onSentMessage={(content) => {
          onSendMessage({ receiverId, senderId, content });
        }}
        title={`De ${nickname} para ${userInfo.nickname}`}
        onDeleteMessage={(mId) => {
          handleHideMessage(mId);
        }}
      />
    );
  }
  return <Box p="var(--spacing-2)">Usuario no encontrado</Box>;
}
