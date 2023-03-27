import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Collection {
  id: string;
  name: string;
  ownerId: string;
}

async function findMyCollections(userId: string) {
  const response = await fetch(
    `/api/collections/[userId]findMyCollectionAPI?userId=${userId}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function myCollection() {
  const [user, setUser] = useState<string>("1024");
  const [collections, setCollections] = useState<String[]>([]);
  useEffect(() => {
    try {
      findMyCollections(user).then((data) => {
        setCollections(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(collections);
  return (
    <div>
      <h1>My Collection</h1>
      <ul>
        {collections.map((collection: any) => (
          <li
            key={collection.id}
            className="bg-red-300 border-sky-500 border-2"
          >
            <div>
              <h2>{collection.name}</h2>
              <p>Collection ID: {collection.id}</p>
              <p>Owner ID: {collection.ownerId}</p>
              <p> {collection.plantContents} </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
