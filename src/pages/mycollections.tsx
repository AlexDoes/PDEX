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
import { toast } from "react-toastify";
import { set } from "lodash";

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
  const [displayPlants, setDisplayPlants] = useState(items);

  const handleClick = (id: string) => {
    router.push(`/collections/${id}`);
  };

  const handleAddCollectionClick = () => {
    setShowForm(!showForm);
  };

  const handleSubmitCollectionForm = async (object: any) => {
    setShowForm(false);
    object.plantContent = [];
    setDisplayPlants([...displayPlants, object]);
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
            bg-opacity-80 bg-green-200
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

    return displayPlants.map((collection: any) => {
      return (
        <div
          className="flex-row flex
            items-center justify-between w-[98%] h-full
            border-slate-300 rounded-xl px-6
            bg-opacity-70 bg-green-200
            md:gap-3
            lg:gap-4
            xl:gap-3 group relative
            xs:gap-1
            py-4
          "
          key={collection.id}
        >
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
                backdrop-invert-[20%]
              border-slate-300
                "
          >
            {collection.plantContents && collection.plantContents.length > 0 ? (
              <ImageCarousel
                images={collection.plantContents.map((plant: any) => {
                  return plant.image;
                })}
              />
            ) : (
              <Link href={`/collections/${collection.id}`}>
                <div
                  id="profileCollectionPlantImage"
                  className="flex justify-center items-center h-[200px] w-[200px] text-center
                  "
                >
                  <div className="flex flex-col items-center justify-center text-[#fffbcc] hover:text-green-300 gap-2">
                    <FaSeedling size={80} />
                    Add a plant
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="flex flex-col w-full gap-2 overflow-hidden">
            <p className="text-2xl indent-3 xl:indent-5 w-full overflow-hidden">
              <Link
                onClick={() => handleClick(collection.id)}
                href={`/collections/${collection.id}`}
                className="whitespace-nowrap overflow-ellipsis hover:underline hover:text-blue-400 w-90%"
              >
                {collection.name}
              </Link>
            </p>
            <div className="w-full border-black">
              <div
                className="
                  h-[140px]
                  w-[93%]
                  xl:w-[97%]
                  md:w-[95%]
                  lg:w-[96%]
                  sm:w-[95%]
                  flex flex-col
                  "
              >
                <div
                  className="              
                      overflow-y-auto 
                      font-light
                      mx-3
                      xs: text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]
                      h-full
                      backdrop-filter backdrop-blur-sm
                      bg-opacity-50
                       g-green-100
                      bg-[#FFF4BD] 
                      pl-3 rounded-md
                      scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
                      scrollbar-rounded-sm
                      w-full
                      flex flex-col
                      pt-2
                      "
                >
                  {collection.plantContents &&
                    collection.plantContents.length > 0 && <p> Contents: </p>}
                  {collection.plantContents &&
                  collection.plantContents.length > 0 ? (
                    collection.plantContents.map((plantItemData: any) => {
                      return (
                        <p
                          key={plantItemData.id}
                          className="text-orange-400 flex
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
            <div className="px-3 transition duration-500 ease-in-out hidden absolute right-0 bottom-0  group-hover:inline-block group-hover:opacity-100 opacity-0 ">
              <DeleteCollectionButton
                user={userId}
                collectionId={collection.id}
                objectName={collection.name}
                onConfirm={handleSubmitCollectionForm}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <h1 className="text-3xl flex justify-center my-3 items-center gap-1">
        My Collections
        <RiPlantLine className="text-3xl text-green-400" />
      </h1>
      <div
        className=" xs:m-0 sm:m-0 w-full border-slate-300 flex flex-col justify-center items-center pb-4 gap-2 
    rounded-xl"
      >
        <div
          className="                      
                      xs:text-2xl
                      text-xl 
                      flex
                      flex-col
                      justify-center items-center
                      py-4
                      border-cyan-300
                      w-[100%]
                      gap-2
                      "
        >
          {collectionsToShow()}
        </div>

        <button
          onClick={handleAddCollectionClick}
          className="bg-green-300 border-sky-300 rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 hover:border-red-300 hover:text-[#ec9e69]
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
      </div>
      <CSSTransition
        in={showForm}
        timeout={1000}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <div
          // onClick={handleAddCollectionClick}
          className="fixed z-50 top-0 right-0 left-0 bottom-0 h-[100vh] w-[100vw] bg-[rgb(0,0,0,.5)] "
        ></div>
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
    </>
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

  const items = await prisma.plantCollection.findMany({
    where: {
      ownerId: String(userId),
    },
    include: {
      plantContents: {},
    },
    orderBy: {
      createdAt: "asc",
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
