import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Collection {
  id: string;
  name: string;
  ownerId: string;
}

interface CollectionProps {
  collections: Collection[];
}

export default function MyCollections({ items }: CollectionProps) {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/collections/${id}`);
  };

  return (
    <div>
      <ul>
        {items.map((collection: any) => (
          <li
            key={collection.id}
            className="bg-red-300 border-sky-500 border-2"
          >
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
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const userId: string = session.user.id;
  const apiUrl: string = `/api/collections/findMyCollections?userId=${userId}`;
  // console.log(apiUrl);
  
  const res = await fetch(
    `http://localhost:3000/api/collections/[userId]findMyCollectionAPI?userId=${userId}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const items = await res.json();

  return {
    props: {
      session,
      userId,
      items,
    },
  };
}
