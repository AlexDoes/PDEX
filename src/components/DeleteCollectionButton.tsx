import { useState, useEffect } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { toast } from "react-toastify";

async function deleteCollection(collectionanduserdata: any) {
  const response = await fetch("/api/collections/deleteCollectionAPI", {
    method: "DELETE",
    body: JSON.stringify(collectionanduserdata),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}

export default function DeleteCollectionButton(props: any) {
  const [user, setUser] = useState<string>(props.user);
  const [collectionId, setCollectionId] = useState<string>(props.collectionId);
  const handleSubmissionFromParent = props.onConfirm;
  const [collectionName, setCollectionName] = useState<string>(
    props.objectName
  );
  useEffect(() => {
    if (props.user) {
      setUser(props.user);
    }
  }, [props.user]);

  async function handleDelete() {
    try {
      const deletedCollection = await deleteCollection({
        collectionId: collectionId,
        userId: user,
      });
      toast.success("Collection has been deleted!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
        hideProgressBar: false,
        className: "confirm-toast",
        style: {
          background: "#c1e1c1",
          color: "#000000",
        },
      });
      handleSubmissionFromParent(collectionId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ConfirmationDialog
      onConfirm={() => handleDelete()}
      prompt={collectionName}
      promptType={"deleteCollection"}
    />
  );
}
