import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import { addGroup, addGroupContact } from "./utils";
import { uid } from "uid";
import { userStore } from "../../global-stores/userStore";

interface CreateGroupButtonProps {
  onClose?: () => void;
}
export function CreateGroupButton({ onClose }: CreateGroupButtonProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [groupName, set_groupName] = useState("");
  const myId = userStore((s) => s.id);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCreate = () => {
    if (groupName.trim() === "") {
      alert("Ingrese un nombre valido");
      return;
    }
    setOpen(false);
    const groupId = uid();
    addGroup({ name: groupName, id: groupId });
    addGroupContact(myId, groupId);

    navigate(`/c/${groupId}`);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Crear un nuevo Grupo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Usuarios disponibles:"}</DialogTitle>
        <DialogContent>
          <Input
            placeholder="Nombre del grupo"
            value={groupName}
            onChange={(e) => set_groupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={onCreate} variant="contained">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
