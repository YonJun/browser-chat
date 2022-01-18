import { Box, IconButton, Typography } from "@mui/material";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

const StyleIfMyMessage = {
  color: {
    0: "#000",
    1: "#fff",
  },
  backgroundColor: {
    0: "tomato",
    1: "gray",
  },
  flexDirection: {
    0: "row",
    1: "row-reverse",
  },
  borderRadius: {
    1: "10px 0 10px 10px",
    0: "0 10px 10px 10px",
  },
};

const TextBubble = styled.div<{ isMyMessage: 1 | 0 }>`
  width: 100%;
  background-color: ${({ isMyMessage }) =>
    StyleIfMyMessage.backgroundColor[isMyMessage]};
  color: ${({ isMyMessage }) => StyleIfMyMessage.color[isMyMessage]};
  display: flex;
  align-items: center;
  flex-direction: ${({ isMyMessage }) =>
    StyleIfMyMessage.flexDirection[isMyMessage]};
  border-radius: ${({ isMyMessage }) =>
    StyleIfMyMessage.borderRadius[isMyMessage]};
  padding: var(--spacing-2);
`;

interface MessageProps {
  id: string;
  isMyMessage: boolean;
  primaryText: string;
  content: string;
  onDelete: (id: string) => void;
}

export function Message(props: MessageProps) {
  const { isMyMessage, primaryText, content, onDelete, id } = props;

  return (
    <TextBubble isMyMessage={isMyMessage ? 1 : 0}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isMyMessage ? "flex-end" : "flex-start"}>
        {!isMyMessage ? (
          <Typography component="span" variant="caption">
            {primaryText}
          </Typography>
        ) : (
          ""
        )}
        <Box display="flex" alignItems="center">
          <Typography component="span" variant="body1">
            {content}
          </Typography>
          {isMyMessage ? (
            <IconButton
              size="small"
              sx={{ ml: 1 }}
              onClick={() => {
                if (onDelete) {
                  onDelete(id);
                }
              }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </TextBubble>
  );
}
