import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ConfirmationDialog from "@/components/ConfirmationDialog";

async function removeUniquePlant(props: any) {
  const response = await fetch(
    "/api/collections/removeUniquePlantFromCollectionAPI",
    {
      method: "PATCH",
      body: JSON.stringify(props),
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function RemoveUniquePlantFromCollectionButton(props: any) {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [user, setUser] = useState<string>(props.userId);
  const [uniquePlantId, setUniquePlantId] = useState<string>(
    props.uniquePlantId
  );
  const [collectionId, setCollectionId] = useState<string>(props.collectionId);
  const handleSubmissionFromParent = props.onConfirm;

  const deletePlant = async () => {
    setConfirmDelete(true);
    await handleRemove();
    toast.success("Plant removed from collection!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      closeOnClick: true,
      draggable: false,
      closeButton: true,
      hideProgressBar: false,
      className: "confirm-toast",
    });
    setConfirmDelete(false);
  };

  //   const handleOnClick = async (event: any) => {
  //     if (confirmDelete) {
  //       setConfirmDelete(false);
  //       await handleRemove(event);
  //       toast.success("Plant removed from collection!", {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 3000,
  //         closeOnClick: true,
  //         draggable: false,
  //         closeButton: true,
  //         hideProgressBar: true,
  //         className: "confirm-toast",
  //       });
  //     }
  //   };

  async function handleRemove() {
    try {
      const removedUniquePlant = await removeUniquePlant({
        uniquePlantId: uniquePlantId,
        userId: user,
        collectionId: collectionId,
      });
      console.log(`removed unique plant: ${removedUniquePlant}`);
      handleSubmissionFromParent();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ConfirmationDialog
      onConfirm={() => deletePlant()}
      prompt={"remove this plant from the collection"}
      promptType={"removeCollection"}
    />
  );
}
