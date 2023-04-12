import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import prisma from "lib/prisma";
import { it } from "node:test";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

export default function MyCollections({ items }: any) {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/myplants/${id}`);
  };
  console.log(items);

  return (
    <div>
      <h1>My plants {} </h1>
      <ul>
        {items.map((item: any) => (
          <li key={item.id} className="bg-red-300 border-sky-500 border-2">
            <div>
              <p>
                <Link
                  onClick={() => handleClick(item.id)}
                  href={`/myplants/${item.id}`}
                >
                  Name: {item.name}
                </Link>
              </p>
              <p>Collection ID: {item.id}</p>
              <p>Owner ID: {item.ownedBy.name}</p>
              <img src={item.image} className="h-[200px] w-[200px]"></img>
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

  const userId: string = (session.user as User).id;
  //   const apiUrl: string = `/api/collections/findMyCollections?userId=${userId}`;

  const items = await prisma.uniquePlant.findMany({
    where: {
      ownerId: String(userId),
    },
    include: {
      ownedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    props: {
      session,
      userId,
      items,
    },
  };
}
