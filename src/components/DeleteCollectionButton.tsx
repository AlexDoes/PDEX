import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import prisma from "lib/prisma";

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

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
    }
  }, [props.user]);

  const handleOnClick = (event: any) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      handleDelete(event);
    }
  };

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const deletedCollection = await deleteCollection({
        collectionId: collectionId,
        userId: user,
      });
      console.log(`deleted collection: ${deletedCollection}`);
      handleSubmissionFromParent();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleDelete}>
        <button
          type="submit"
          onClick={handleOnClick}
          className="underline border-4 border-black bg-red-400"
        >
          Delete Collection
        </button>
      </form>
    </div>
  );
}
