import { useState, useEffect } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { toast } from "react-toastify";

async function deleteCollection(collectionanduserdata: any) {
  const response = await fetch("/api/comment/deleteCommentAPI", {
    method: "DELETE",
    body: JSON.stringify(collectionanduserdata),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}

export default function DeleteCommentButton(props: any) {
  const [user, setUser] = useState<string>(props.userId);
  const [commentId, setCommentId] = useState<string>(props.commentId);
  const handleSubmissionFromParent = props.onConfirm;

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
    }
  }, [props.user]);

  async function handleDelete() {
    try {
      const deletedCollection = await deleteCollection({
        commentId: commentId,
        userId: user,
      });
      toast.success("Comment has been deleted!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
        hideProgressBar: false,
        className: "confirm-toast",
      });
      handleSubmissionFromParent(commentId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ConfirmationDialog
      onConfirm={() => handleDelete()}
      prompt={"delete this comment"}
      promptType={"deleteComment"}
    />
  );
}
