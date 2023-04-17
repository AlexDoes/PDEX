import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import prisma from "lib/prisma";

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
  const handleSubmissionFromParent = props.onConfirm;

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
    }
  }, [props.user]);

  const handleOnClick = (event: any) => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      handleDelete(event);
    }
  };

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const deletedUniquePlant = await deleteUniquePlant({
        uniquePlantId: uniquePlantId,
        userId: user,
      });
      console.log(`deleted unique plant: ${deletedUniquePlant}`);
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
          Delete Unique Plant
        </button>
      </form>
    </div>
  );
}
