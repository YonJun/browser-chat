import { Box, TextField, Stack, IconButton, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EditableLabel } from "../../components/EditableLabel";
import styled from "styled-components";
import MessageIcon from "@mui/icons-material/Message";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ListOnlineUsers } from "./ListOnlineUsers";
import { CreateGroupButton } from "./CreatGroupButton";
import { userStore } from "./../../global-stores/userStore";
import { InputFilter, InputFilterPureProps } from "./InputFilter";

const OptionsContainer = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: var(--spacing-3);
  padding-bottom: var(--spacing);
  padding-right: 0;
  z-index: 2;
`;

const ListUsersContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 3;
`;

export function ChatNavigationHeader(props: InputFilterPureProps) {
  const { nickname, setNickname } = userStore((s) => s);
  const [username, set_username] = useState(nickname);
  const [isOpenSlide, set_isOpenSlide] = useState(false);

  const onSave = () => {
    setNickname(username);
  };
  return (
    <>
      <Slide direction="right" in={isOpenSlide} mountOnEnter unmountOnExit>
        <ListUsersContainer>
          <Box
            p="var(--spacing-3)"
            position="sticky"
            top="0"
            bgcolor="#fff"
            width="100%"
            zIndex="2">
            <IconButton onClick={() => set_isOpenSlide(false)}>
              <ArrowBackIcon />
            </IconButton>
          </Box>

          <Box p="var(--spacing-3)" pr="var(--spacing)">
            <Box mb={2}>
              <CreateGroupButton onClose={() => set_isOpenSlide(false)} />
            </Box>
            <ListOnlineUsers
              onSelectUser={() => {
                set_isOpenSlide(false);
              }}
            />
          </Box>
        </ListUsersContainer>
      </Slide>
      <OptionsContainer>
        <Stack spacing={2} width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <EditableLabel
              value={username}
              onChange={set_username}
              onSave={onSave}
            />
            <IconButton onClick={() => set_isOpenSlide(true)}>
              <MessageIcon />
            </IconButton>
          </Box>
          <InputFilter {...props} />
        </Stack>
      </OptionsContainer>
    </>
  );
}
