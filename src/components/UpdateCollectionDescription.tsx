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
import { SlPencil } from "react-icons/sl";

interface ConfirmationDialogProps {
  onConfirm: any;
  prompt: string;
  promptType: string;
}

interface updateProps {
  field: string;
  userId: string;
  plantInfo: any;
  onConfirm: any;
  plantDescription: string;
  collectionName: string;
}

const map: Myobject = {
  name: "name",
  species: "species",
  species2: "secondary Species",
  water: "watering Schedule",
  light: "sunlight requirements",
  plantHeight: "height",
  plantWidth: "width",
  description: "description",
  image: "Image",
};

interface Myobject {
  [key: string]: any;
}

export default function UpdateCollectionDescriptionComponent({
  plantDescription,
  onConfirm,
  collectionName,
}: updateProps) {
  const [open, setOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState(plantDescription || "");

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
    <div className="mr-1">
      <button
        className=" border-green-500 rounded-md w-[25px] h-[25px] shadow-md bg-[#c1e1c1]  hover:bg-[#c1e1c183] text-slate-400 font-bold flex mx-auto my-auto justify-center items-center hover:shadow-lg hover:shadow-slate-300"
        onClick={handleOpen}
      >
        <SlPencil />
      </button>
      <Dialog className="" fullWidth open={open} onClose={handleClose}>
        <div className="bg-[#d5ffdd] text-[#e8ded1] font-outline-2">
          <DialogTitle fontSize={24} className="p-2 mt-2">
            Update {collectionName}'s description:
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="text-input"
              label="Input"
              type="text"
              fullWidth
              value={textInputValue}
              onChange={handleTextInputChange}
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
