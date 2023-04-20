import { useState } from "react";
import { useRouter } from "next/router";

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
  const [user, setUser] = useState<string>(props.userId);
  const [uniquePlantId, setUniquePlantId] = useState<string>(
    props.uniquePlantId
  );
  const [collectionId, setCollectionId] = useState<string>(props.collectionId);
  const handleSubmissionFromParent = props.onConfirm;

  const handleOnClick = (event: any) => {
    if (
      window.confirm(
        "Are you sure you want to remove this plant from the collection?"
      )
    ) {
      handleRemove(event);
    }
  };

  async function handleRemove(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    <div>
      <form onSubmit={handleRemove}>
        <button
          type="submit"
          onClick={handleOnClick}
          className="underline border-4 border-black bg-red-400"
        >
          Remove Unique Plant
        </button>
      </form>
    </div>
  );
}
