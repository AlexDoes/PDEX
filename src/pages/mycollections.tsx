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
import { FaSeedling } from "react-icons/fa";
import ImageCarousel from "@/components/ImageCarouselComponent";
import { RiPlantLine } from "react-icons/ri";

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

  const collectionsToShow = () => {
    if (items.length === 0) {
      return (
        <div
          className="
            text-xl font-light
            max-w-[600px]
            min-w-[40vw]
            w-[96%]
            h-[100px]
            items-center justify-between
            border-slate-300 border rounded-xl p-2
            bg-opacity-50 bg-green-200
            md:gap-5
            lg:gap-4
            xl:gap-1
            text-center
            flex
          "
        >
          There are currently no collections yet, create a new collection to
          display your plants!
        </div>
      );
    }

    return items.map((collection: any) => {
      return (
        <div
          className="flex-row flex
            items-center justify-between w-[98%] h-full
            border-slate-300 border rounded-xl p-2
            bg-opacity-50 bg-green-200
            md:gap-5
            lg:gap-4
            xl:gap-1
          "
        >
          <div className="flex flex-col w-full gap-1">
            <p className="text-xl indent-3 xl:indent-5">
              <Link
                onClick={() => handleClick(collection.id)}
                href={`/collections/${collection.id}`}
              >
                {collection.name}
              </Link>
            </p>
            <div className="w-full border-black">
              <div
                className="
                  h-[140px]
                  w-[90%]
                  xl:w-[95%]
                  md:w-[95%]
                  lg:w-[95%]
                  sm:w-[95%]
                  flex flex-col
                  "
              >
                <div
                  className="              
                      overflow-auto 
                      font-light
                      mx-3
                      xs: text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]
                      h-full bg-[#FFF4BD] 
                      pl-3 pr-3 pt-2 pb-2 rounded-md
                      scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
                      scrollbar-rounded-sm
                      w-full
                      flex flex-col
                      "
                >
                  {collection.plantContents.length > 0 && <p> Contents: </p>}
                  {collection.plantContents.length > 0 ? (
                    collection.plantContents.map((plantItemData: any) => {
                      return (
                        <p
                          key={plantItemData.id}
                          className="text-orange-600 flex
                            "
                        >
                          <Link href={`/myplants/${plantItemData.id}`}>
                            {plantItemData.name}
                          </Link>
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-orange-600">
                      There are currently no plants in this collection, please
                      add some to showcase your plants!
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <DeleteCollectionButton
                user={userId}
                collectionId={collection.id}
                onConfirm={handleSubmitCollectionForm}
              />
            </div>
          </div>
          <div
            id="profileCollectionImage"
            className="
                min-w-[200px] min-h-[200px]
                rounded-lg
                w-[200px] h-[200px]
                sm:max-w-[300px] sm:max-h-[300px]
                lg:max-w-[300px] lg:max-h-[300px]
                xl:max-w-[300px] xl:max-h-[300px]
                flex justify-center items-center
                bg-opacity-50 bg-yellow-200
                border border-slate-300
                "
          >
            {collection.plantContents.length > 0 ? (
              <ImageCarousel
                images={collection.plantContents.map((plant: any) => {
                  return plant.image;
                })}
              />
            ) : (
              <div
                id="profileCollectionPlantImage"
                className="flex justify-center items-center h-[200px] w-[200px]
                  "
              >
                <div>Coming Soon</div>
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className=" xs:m-0 sm:m-0 w-full border-slate-300 flex flex-col justify-center items-center border pb-4 gap-2 
    backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-xl bg-orange-100"
    >
      <h1 className="text-3xl flex justify-center mt-4 items-center gap-1">
        My Collections
        <RiPlantLine className="text-3xl text-green-400" />
      </h1>
      <div
        className="                      
                      xs:text-2xl
                      text-xl 
                      flex
                      flex-col
                      justify-center items-center
                      py-1
                      border-cyan-300
                      w-[100%]
                      "
      >
        {collectionsToShow()}
      </div>
      {/* <ul>
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
              })}
              <DeleteCollectionButton
                user={userId}
                collectionId={collection.id}
                onConfirm={handleSubmitCollectionForm}
              />
            </div>
          </li>
        ))}
      </ul> */}

      <button
        onClick={handleAddCollectionClick}
        className="bg-green-300 border-sky-300 border rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 hover:border-red-300 hover:text-[#ec9e69]
   ease-in-out duration-300
        hover:bg-[#fffbcc]
        "
        //#fffbcc
        //#389168
        //#389168
        //#fffbcc
        //#ec9e69
      >
        Create a collection <FaSeedling />
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
