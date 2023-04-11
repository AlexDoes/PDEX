import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Collection {
  id: string;
  name: string;
  ownerId: string;
}

const NewComponent = ({ user }) => {
  const newRouter = useRouter();
  const handleClick = (id) => {
    newRouter.push(`/collections/${id}`);
  };
  const [collections, setCollections] = useState<String[]>([]);
  useEffect(() => {
    try {
      findMyCollections(user).then((data) => {
        setCollections(data);
        localStorage.setItem("collections", JSON.stringify(data));
      });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return (
    <ul>
      {collections.map((collection: any) => (
        <li key={collection.id} className="bg-red-300 border-sky-500 border-2">
          <div>
            <Link
              onClick={() => handleClick(collection.id)}
              href={`/collections/${collection.id}`}
            >
              Name: {collection.name}
            </Link>
            <p>Collection ID: {collection.id}</p>
            <p>Owner ID: {collection.ownerId}</p>
            <p> {collection.plantContents} </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

async function findMyCollections(userId: string) {
  console.log(userId);
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
  const { data: session, status } = useSession();
  const [user, setUser] = useState<string>("");
  const [collections, setCollections] = useState<String[]>([]);
  const userId = session?.user.id;
  const demoId = "clg1tydpd0000mukbypq2ib2s";
  const newRouter = useRouter();

  // useEffect(() => {
  //   if (session) {
  //     setUser(userId);
  //   }
  // }, [session]);

  useEffect(() => {
    const getUser = () => {
      if (session) {
        setUser(session.user?.id);
      }
    };
    try {
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [session]);

  const handleClick = (id) => {
    newRouter.push(`/collections/${id}`);
  };

  // useEffect(() => {
  //   try {
  //     findMyCollections(user).then((data) => {
  //       setCollections(data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [user]);

  return (
    <div>
      <h1>My Collection</h1>
      <NewComponent user={user} />
    </div>
  );
}
