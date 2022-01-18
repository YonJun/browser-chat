import React from "react";
import { ListItem } from "../../components/ListItem";
import { useNavigate } from "react-router-dom";

interface ChatUserItemProps {
  id: string;
  name: string;
  to?: string;
  onClick?: () => void;
}

export function ChatUserItem(props: ChatUserItemProps) {
  const { id, name, to, onClick } = props;
  const navigate = useNavigate();

  return (
    <ListItem
      primaryText={name}
      secondaryText={id}
      onClick={() => {
        navigate(to || `/u/${id}`);
        if (onClick) onClick();
      }}
    />
  );
}
