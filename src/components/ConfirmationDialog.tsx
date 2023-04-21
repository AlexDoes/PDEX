import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmationDialogProps {
  onConfirm: any;
  prompt: string;
  promptType: string;
}

interface Actions {
  [key: string]: {
    message: string;
    button: string;
  };
}

const ConfirmationDialog = ({
  onConfirm,
  prompt,
  promptType,
}: ConfirmationDialogProps) => {
  const actions: Actions = {
    removeCollection: {
      message: "remove this plant from the collection",
      button: "Remove from collection",
    },
    deletePlant: {
      message: "delete this plant",
      button: "Delete plant",
    },
    deleteCollection: {
      message: "delete this collection",
      button: "Delete collection",
    },
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>{actions[promptType].button}</Button>
      <Dialog open={open} onClose={handleClose}>
        <div className="bg-[#ECF87F] text-[#d6ae87] ">
          <DialogTitle>Confirm to {actions[promptType].message}</DialogTitle>
          <DialogContent>
            <DialogContentText className="-[#d6ae87]">
              Are you sure you want to {prompt}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm} className="text-red-500">
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
export default ConfirmationDialog;
