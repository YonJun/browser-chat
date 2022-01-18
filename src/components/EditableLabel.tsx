import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

interface EditableLabelProps {
  value?: string;
  onChange?: (text: string) => void;
  onSave?: () => void;
}

export function EditableLabel(props: EditableLabelProps) {
  const [editMode, set_editMode] = useState(false);
  const { value = "", onChange, onSave } = props;
  const [text, set_text] = useState(value);

  const val = typeof props.value !== "undefined" ? value : text;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value.substring(0, 10));
    } else {
      set_text(e.target.value.substring(0, 10));
    }
  };

  const onClickIcon = () => {
    if (editMode) {
      if (val.trim() === "") {
        alert("Ingrese un nombre valido");
        return;
      }
      set_editMode(false);
      if (onSave) onSave();
    } else {
      set_editMode(true);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      {editMode ? (
        <Tooltip title="Máximo de 10 caracteres" disableInteractive>
          <input value={val} onChange={onChangeInput} />
        </Tooltip>
      ) : (
        <Box component="span" title="Username">
          {value}
        </Box>
      )}

      <IconButton aria-label="delete" onClick={onClickIcon}>
        {editMode ? <SaveIcon /> : <EditIcon />}
      </IconButton>
    </Box>
  );
}
