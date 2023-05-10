import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import prisma from "lib/prisma";
import CreateCollectionForm from "@/components/CreateCollectionForm";
import DeleteCollectionButton from "@/components/DeleteCollectionButton";
import { usePreviousScrollPosition } from "@/components/PreviousScrollPosition";
import { CSSTransition } from "react-transition-group";
import { Transition } from "react-transition-group";
import { useTransition } from "react";

interface Collection {
  id: string;
  name: string;
  ownerId: string;
}

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

interface Item {
  id: string;
  name: string;
  ownerId: string;
  plantContents: string;
}

interface Items {
  items: Item[];
}

interface CollectionProps {
  items: Collection[];
  userId: string;
}

export default function MyCollections({ items, userId }: CollectionProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [state, setState] = useState(items);
  usePreviousScrollPosition();
  const handleClick = (id: string) => {
    router.push(`/collections/${id}`);
  };
  const handleAddCollectionClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmitCollectionForm = async () => {
    await router.push(router.asPath);
    setShowForm(false);
  };

  return (
    <div className="">
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
              <p>Owner ID: {collection.ownerId}</p>{" "}
              {collection.plantContents.map((plantItemData: any) => {
                return (
                  <p key={plantItemData.id} className="text-orange-600">
                    <Link href={`/myplants/${plantItemData.id}`}>
                      {plantItemData.name}
                    </Link>
                  </p>
                );
              })}{" "}
              <DeleteCollectionButton
                user={userId}
                collectionId={collection.id}
                onConfirm={handleSubmitCollectionForm}
              />
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAddCollectionClick}
        className="border-2 border-red-500 bg-slate-700 text-red-500"
      >
        'Create a new collection +'
      </button>
      <CSSTransition
        in={showForm}
        timeout={1000}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <div className="fixed top-0 h-[100vh] w-[100vw] bg-[rgb(0,0,0,.5)] right-0"></div>
      </CSSTransition>

      <CSSTransition
        in={showForm}
        timeout={1000}
        classNames="page"
        unmountOnExit
        mountOnEnter
      >
        <CreateCollectionForm
          user={userId}
          onSubmit={handleSubmitCollectionForm}
          closeCollectionForm={handleAddCollectionClick}
        />
      </CSSTransition>
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
  const apiUrl: string = `/api/collections/findMyCollections?userId=${userId}`;
  console.log(userId);
  const items = await prisma.plantCollection.findMany({
    where: {
      ownerId: String(userId),
    },
    include: {
      plantContents: {},
    },
  });

  return {
    props: {
      session,
      userId,
      items: JSON.parse(JSON.stringify(items)),
    },
  };
}
