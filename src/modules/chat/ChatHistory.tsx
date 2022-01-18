import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { Message } from "../../components/Message";
import type { Message as TypeMessage } from "../../custom-types/message";
import { ChatHistoryFooter } from "./ChatHistoryFooter";
import { userStore } from "./../../global-stores/userStore";
import { hideMessage } from "./utils";

const Header = styled.div`
  padding: var(--spacing-3);
  position: sticky;
  top: 0;
  height: 50px;
  background-color: #f3f3f3;
  width: 100%;
  display: flex;
  align-items: center;
`;

const MessagesContainer = styled.div`
  padding: var(--spacing-3);
  width: 100%;
  min-height: calc(100% - 130px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 10px;
`;

interface ChatHistoryProps {
  messages: TypeMessage[];
  title: string;
  onSentMessage: (m: string) => void;
  onDeleteMessage?: (id: string) => void;
}

export function ChatHistory(props: ChatHistoryProps) {
  const myId = userStore((s) => s.id);
  const { messages, title, onSentMessage, onDeleteMessage } = props;

  return (
    <Box height="100%">
      <Header>
        <Typography variant="h6">{title}</Typography>
      </Header>
      <MessagesContainer>
        {messages.map((message) => {
          const isMyMessage = message.senderId === myId;
          if (isMyMessage && message.isHidden) {
            return null;
          }
          return (
            <Box
              key={message.id}
              alignSelf={isMyMessage ? "flex-end" : "flex-start"}
              maxWidth="300px">
              <Message
                id={message.id}
                onDelete={() => {
                  if (onDeleteMessage) {
                    onDeleteMessage(message.id);
                  }
                }}
                isMyMessage={isMyMessage}
                primaryText={message.senderId}
                content={`${message.content}`}
              />
            </Box>
          );
        })}
      </MessagesContainer>
      <ChatHistoryFooter onSentMessage={(m) => onSentMessage(m)} />
    </Box>
  );
}
