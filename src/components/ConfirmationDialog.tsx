import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

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
      button: `<BsFillTrashFill />`,
    },
    deleteCollection: {
      message: "delete this collection",
      button: "Delete collection",
    },
    deleteComment: {
      message: "delete this comment",
      button: "Delete comment",
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
      <button onClick={handleOpen} className="">
        {promptType != "deleteComment" && promptType !== "removeCollection" ? (
          <div className="hover:outline outline-slate-400 rounded-lg p-1 text-red-500 hover:text-red-600">
            <BsFillTrashFill className="text-xl" />
          </div>
        ) : (
          <div>
            <AiOutlineClose
              className={` ${
                promptType === "removeCollection" ? "text-xl" : "text-sm"
              } text-gray-400 rounded-sm hover:outline hover:outline-slate-400 hover:bg-gray-300 hover:text-gray-500`}
            />
          </div>
        )}
      </button>

      <Dialog open={open} onClose={handleClose}>
        <div className="bg-[#ea9179] text-black">
          <DialogTitle>Confirm to {actions[promptType].message}</DialogTitle>
          <DialogContent className="">
            <DialogContentText className="text-xl ">
              Are you sure you want to {actions[promptType].message}? <br />
              {promptType != "removeCollection" &&
                `This action cannot be undone.`}
              {promptType != "removeCollection" && <br />}
              {promptType != "deleteComment" &&
                promptType != "removeCollection" &&
                `(
                You will be deleting
                ${prompt && prompt.toUpperCase()}.
              )`}
              {promptType == "removeCollection" &&
                `You will be removing ${
                  prompt && prompt.toUpperCase()
                } from the collection.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};
export default ConfirmationDialog;
