import { IconButton } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";

const Container = styled.div`
  padding: var(--spacing-3);
  position: sticky;
  width: 100%;
  bottom: 0;
  background-color: #f3f3f3;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const TextArea = styled.textarea`
  max-height: 50px;
  width: 100%;
  border: 1px solid gray;
  background: none;
  resize: none;
  border-radius: 10px;
`;

interface ChatHistoryFooterProps {
  onSentMessage?: (message: string) => void;
}

export function ChatHistoryFooter({ onSentMessage }: ChatHistoryFooterProps) {
  const [inputText, set_inputText] = useState("");
  const handleSendButton = () => {
    if (inputText.trim() !== "") {
      if (onSentMessage) {
        onSentMessage(inputText);
        set_inputText("");
      }
    }
  };

  return (
    <Container>
      <TextArea
        value={inputText}
        onChange={(e) => set_inputText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendButton();
          }
        }}
      />
      <IconButton onClick={handleSendButton}>
        <SendIcon />
      </IconButton>
    </Container>
  );
}
