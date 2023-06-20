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
import { toast } from "react-toastify";
import filter from "./Filter";

interface ConfirmationDialogProps {
  onConfirm: any;
  prompt: string;
  promptType: string;
}

interface updateProps {
  onConfirm: any;
  plantDescription: string;
  collectionName: string;
  name: boolean;
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
  name,
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
    const value = event.target.value;
    setTextInputValue(value);
  };

  const handleSubmit = () => {
    const data = textInputValue.trim();
    if (data === plantDescription) {
      handleClose();
      toast.error("No changes were made to the description", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        style: { backgroundColor: "#f8d7da" },
      });
      return;
    }
    onConfirm(data.length === 0 ? "" : filter.clean(data));
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
        <div className="bg-[#d5ffdd] font-outline-2">
          <DialogTitle fontSize={24} className="">
            Update {collectionName}'s {name ? `name` : `description`}:
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
              minRows={name ? "1" : "3"}
              multiline
              value={textInputValue}
              inputProps={{ style: { whiteSpace: "pre-wrap" } }}
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
