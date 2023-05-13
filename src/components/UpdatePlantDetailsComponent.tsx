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

export default function UpdateDataComponent({
  field,
  userId,
  plantInfo,
  onConfirm,
}: updateProps) {
  const [open, setOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState(
    `${plantInfo[field]}` || ""
  );

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
      {/* <Button
        variant="outlined"
        color="primary"
        className="w-60 border border-red-500"
        onClick={handleOpen}
      >
        Update {field}
      </Button> */}

      <button
        className=" border-green-500 rounded-md w-[25px] h-[25px] shadow-lg bg-[#c1e1c1]  hover:bg-[#c1e1c183] text-slate-400 font-bold flex mx-auto my-auto justify-center items-center"
        onClick={handleOpen}
      >
        <SlPencil />
      </button>
      <Dialog className="" open={open} onClose={handleClose}>
        <div className="bg-[#d5ffdd] text-[#e8ded1] font-outline-2">
          <DialogTitle className="p-2 mt-2">
            Update {plantInfo.name}'s {map[field]} to:
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="text-input"
              label="Input"
              type={
                field === "plantHeight" || field === "plantWidth"
                  ? "number"
                  : "text"
              }
              fullWidth
              value={textInputValue}
              onChange={handleTextInputChange}
              className=""
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
