import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "@/components/ConfirmationDialog";

async function deleteUniquePlant(uniqueplantanduserdata: any) {
  const response = await fetch("/api/uniqueplants/deleteUniquePlantAPI", {
    method: "DELETE",
    body: JSON.stringify(uniqueplantanduserdata),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}

export default function DeleteUniquePlantButton(props: any) {
  const [user, setUser] = useState<string>(props.user);
  const [uniquePlantId, setUniquePlantId] = useState<string>(
    props.uniquePlantId
  );
  const [uniquePlantName, setUniquePlantName] = useState<string>(
    props.objectName
  );
  const handleSubmissionFromParent = props.onConfirm;

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
    }
  }, [props.user]);

  async function handleDelete() {
    try {
      const deletedUniquePlant = await deleteUniquePlant({
        uniquePlantId: uniquePlantId,
        userId: user,
      });
      toast.success("The plant has been deleted!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
        hideProgressBar: false,
        className: "confirm-toast",
      });
      handleSubmissionFromParent();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ConfirmationDialog
      onConfirm={() => handleDelete()}
      prompt={uniquePlantName}
      promptType={"deletePlant"}
    />
  );
}
