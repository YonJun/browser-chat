import { List, Typography } from "@mui/material";
import { ChatUserItem } from "./ChatUserItem";
import { useOnlineUsers } from "./../../hooks/useOnlineUsers";
import { InputFilter } from "./InputFilter";
import { useState } from "react";

export function ListOnlineUsers({
  onSelectUser,
}: {
  onSelectUser?: () => void;
}) {
  const { users } = useOnlineUsers();
  const [filterKey, set_filterKey] = useState("");

  return (
    <>
      <InputFilter
        filterKey={filterKey}
        onChangeFilterKey={(f) => set_filterKey(f)}
      />
      <Typography variant="body2" color="primary">
        Usuarios disponibles:
      </Typography>
      <List>
        {users
          .filter(
            (c) =>
              c.nickname
                .toLowerCase()
                .trim()
                .includes(filterKey.toLocaleLowerCase().trim()) ||
              c.id
                .toLowerCase()
                .trim()
                .includes(filterKey.toLocaleLowerCase().trim()),
          )
          .map((u) => (
            <ChatUserItem
              key={u.id}
              id={u.id}
              name={u.nickname}
              onClick={onSelectUser}
            />
          ))}
      </List>
    </>
  );
}
