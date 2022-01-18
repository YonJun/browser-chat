import { Box, Divider, Typography, List } from "@mui/material";
import { ListItem } from "../../components/ListItem";
import { useNavigate } from "react-router-dom";
import { ChatUserItem } from "./ChatUserItem";
import { ChatNavigationHeader } from "./ChatNavigationHeader";
import { useContacts } from "../../hooks/useContacts";
import { useMemo, useState } from "react";
import { useGroups } from "./../../hooks/useGroups";
import { getDefaultGroups } from "./utils";

const defualtGroups = getDefaultGroups();

export function ChatNavigation() {
  const navigate = useNavigate();
  const { data: contacts } = useContacts();
  const { data: groups } = useGroups();
  const [filterKey, set_filterKey] = useState("");

  const resultContacts = useMemo(() => {
    return contacts.filter(
      (c) =>
        c.name
          .toLowerCase()
          .trim()
          .includes(filterKey.toLocaleLowerCase().trim()) ||
        c.id
          .toLowerCase()
          .trim()
          .includes(filterKey.toLocaleLowerCase().trim()),
    );
  }, [contacts, filterKey]);

  const resultGroups = useMemo(() => {
    return defualtGroups
      .concat(groups)
      .filter((c) =>
        c.name
          .toLowerCase()
          .trim()
          .includes(filterKey.toLocaleLowerCase().trim()),
      );
  }, [groups, filterKey]);
  console.log(resultGroups);

  return (
    <>
      <ChatNavigationHeader
        filterKey={filterKey}
        onChangeFilterKey={(f) => set_filterKey(f)}
      />
      <Box padding="var(--spacing-3)" pr="0">
        <Typography variant="body2" color="primary">
          Mensajes recientes:
        </Typography>
        <List>
          {resultContacts.map((contact) => (
            <ChatUserItem
              key={contact.id}
              id={contact.id}
              name={contact.name}
              to={`/${contact.type}/${contact.id}`}
            />
          ))}
        </List>
        <Box pt={1} pb={2}>
          <Divider />
        </Box>
        <Typography variant="body2" color="primary">
          Grupos:
        </Typography>
        <List>
          {resultGroups.map((c) => (
            <ListItem
              key={c.id}
              primaryText={c.name}
              onClick={() => {
                navigate(`/c/${c.id}`);
              }}
            />
          ))}
        </List>
      </Box>
    </>
  );
}
