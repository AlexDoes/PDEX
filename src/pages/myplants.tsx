import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import prisma from "lib/prisma";
import CreateUniquePlant from "@/components/CreateUniquePlantFormComponent";
import { useState, useEffect } from "react";
import DeleteUniquePlantButton from "@/components/DeleteUniquePlantButton";

interface User {
  id: string;
  name: string;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

export default function MyCollections({
  items,
  userId,
  username,
  session,
}: any) {
  const router = useRouter();
  console.log(username);
  const handleClick = (id: string) => {
    router.push(`/myplants/${id}`);
  };
  // const [showForm, setShowForm] = useState(false);
  const [showForm, setShowForm] = useState(false); // change when deployed

  const onSubmitFromParent = () => {
    setShowForm(false);
    router.push(router.asPath);
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleRouteChange = () => {
      // Save the current scroll position when the user navigates away from the page
      setScrollPosition(window.scrollY);
    };

    const handleRouteChangeComplete = () => {
      // Restore the saved scroll position when the user navigates back to the page
      window.scrollTo(0, scrollPosition);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events, scrollPosition]);

  return (
    <div>
      <h1>My plants {} </h1>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add a plant</button>
      )}
      {showForm && (
        <CreateUniquePlant userId={userId} onSubmit={onSubmitFromParent} />
      )}
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
              <p>Collection ID: {item.id.toUpperCase()}</p>
              <p>Owner ID: {item.ownedBy.name}</p>
              <img src={item.image} className="h-[200px] w-[200px]"></img>
            </div>
            <DeleteUniquePlantButton
              user={userId}
              uniquePlantId={item.id}
              onConfirm={onSubmitFromParent}
            />
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
  const username: string = (session.user as User).name;

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
      username,
    },
  };
}
