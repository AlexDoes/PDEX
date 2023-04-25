import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

interface ConfirmationDialogProps {
  onConfirm: any;
  prompt: string;
  promptType: string;
}

interface updateProps {
  field: string;
  userId: string;
  userInfo: any;
  onConfirm: any;
}

export default function UpdateDataComponent({
  field,
  userId,
  userInfo,
  onConfirm,
}: updateProps) {
  const [open, setOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState(`${userInfo[field]}`);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const data = textInputValue;
    onConfirm(data);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className="w-60"
        onClick={handleOpen}
      >
        Update {field}
      </Button>
      <Dialog className="" open={open} onClose={handleClose}>
        <div className="bg-[#d5ffdd] text-[#e8ded1] font-outline-2">
          <DialogTitle className="p-2 mt-2">
            What would you like to change your {field} to :
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="text-input"
              label="Text Input"
              fullWidth
              value={textInputValue}
              onChange={handleTextInputChange}
              className="opacity-100 text-green-400"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
