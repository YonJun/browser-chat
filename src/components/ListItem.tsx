import React from "react";
import { default as ListItemMui } from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography, ListItemButton } from "@mui/material";

interface ListItemProps {
  primaryText: string;
  secondaryText?: string;
  rightText?: string;
  onClick?: () => void;
}

export function ListItem(props: ListItemProps) {
  const { primaryText, secondaryText, rightText, onClick } = props;
  return (
    <ListItemButton onClick={onClick} sx={{ pl: 1, borderRadius: 2 }}>
      <ListItemMui
        sx={{ pl: 0 }}
        secondaryAction={
          typeof rightText !== "undefined" ? (
            <Typography variant="subtitle2">{rightText}</Typography>
          ) : (
            ""
          )
        }>
        <ListItemText primary={primaryText} secondary={secondaryText} />
      </ListItemMui>
    </ListItemButton>
  );
}
