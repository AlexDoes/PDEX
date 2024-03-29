import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { useState, useEffect, useRef } from "react";
import AddUniquePlantToCollection from "@/components/AddUniquePlantToCollection";
import RemoveUniquePlantFromCollectionButton from "@/components/RemoveUniquePlantFromCollectionButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { FaSeedling } from "react-icons/fa";
import { toast } from "react-toastify";
import UpdateCollectionDescriptionComponent from "@/components/UpdateCollectionDescription";
import { set } from "lodash";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

interface Plant {
  id: string;
  name: string;
  ownerId: string;
}

interface usersUniquePlants {
  id: string;
  name: string;
  image: string;
  description: string;
  species: string;
  subspecies: string;
  height: string;
  width: string;
  depth: string;
  weight: string;
  unit: string;
}

interface PlantsProps {
  plants: Plant[];
  plantContentsData: any;
  userId: string;
  usersUniquePlants: usersUniquePlants[];
  collectionID: string;
}

export default function ThisCollection({
  plantContentsData,
  userId,
  usersUniquePlants,
  collectionID,
}: PlantsProps) {
  const [showAddPlant, setShowAddPlant] = useState(false);
  const [addPlant, setAddPlant] = useState(false);
  const [collectionDescription, setCollectionDescription] = useState(
    plantContentsData.description
  );
  const [collectionName, setCollectionName] = useState(plantContentsData.name);

  const transitionRef = useRef(null);
  const transitionRef2 = useRef(null);
  const [plantContents, setPlantContents] = useState(
    plantContentsData.plantContents
  );

  const plantstoAdd = usersUniquePlants.filter((plant) => {
    return !plantContents.some(
      (plantContent: any) => plantContent.id === plant.id
    );
  });

  useEffect(() => {
    setCollectionDescription(plantContentsData.description);
  }, [plantContentsData.description]);

  useEffect(() => {
    setCollectionName(plantContentsData.name);
  }, [plantContentsData.name]);

  useEffect(() => {
    plantstoAdd;
  }, [plantstoAdd]);

  const router = useRouter();

  const handleAddPlantClick = (e: any) => {
    e.preventDefault();
    setShowAddPlant(true);
  };

  const handleCreatePlanClick = (e: any) => {
    e.preventDefault();
    router.push("/myplants" + "#addPlantButton");
  };

  const onSubmitFromParent = (data: string[]) => {
    setShowAddPlant(false);
    setPlantContents((plantContents: any) => [...plantContents, ...data]);
  };

  const handleOnClose = () => {
    setShowAddPlant(false);
  };

  const onSubmitFromParentRemove = (data: string[]) => {
    setShowAddPlant(false);
    setPlantContents((plantContents: any) => [
      ...plantContents.filter((plant: any) => plant.id !== data),
    ]);
  };

  const plantsToShow = () => {
    return (
      <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full xl:gap-2">
        {plantContents.map((plantContent: any) => (
          <div
            key={plantContent.id}
            className="flex-col items-center justify-center bg-opacity-50 bg-green-200 hover:bg-opacity-70 rounded-xl p-4 gap-2 pt-6
            flex border-slate-300 group relative"
          >
            <Link href={`/myplants/${plantContent.id}`}>
              <img
                src={plantContent.image}
                alt={plantContent.name}
                className="rounded-xl xs:w-[250px] xs:h-[300px] 
                lg:w-[300px] lg:h-[350px] border-gray-400"
              />
            </Link>
            <div className="whitespace-nowrap overflow-ellipsis hover:underline hover:text-blue-400 w-90%">
              <Link href={`/myplants/${plantContent.id}`}>
                <h1>{plantContent.name}</h1>
              </Link>
            </div>
            <div className="px-3 transition duration-500 ease-in-out group-hover:inline-block group-hover:opacity-100 opacity-0 ">
              <RemoveUniquePlantFromCollectionButton
                uniquePlantId={plantContent.id}
                plantName={plantContent.name}
                collectionId={collectionID}
                userId={userId}
                onConfirm={onSubmitFromParentRemove}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const reload = (response: String) => {
    setCollectionDescription(response);
  };

  const reloadName = (response: String) => {
    setCollectionName(response);
  };

  const showChangeButton = () => {
    return (
      <UpdateCollectionDescriptionComponent
        collectionName={plantContentsData.name}
        plantDescription={collectionDescription}
        name={false}
        onConfirm={(data: string) =>
          handleUpdate(data, reload, userId, collectionID)
        }
      />
    );
  };

  const editCollectionNameButton = () => {
    return (
      <UpdateCollectionDescriptionComponent
        collectionName={collectionName}
        plantDescription={collectionName}
        name={true}
        onConfirm={(data: string) =>
          handleUpdateName(data, reloadName, userId, collectionID)
        }
      />
    );
  };

  const [visibility, setVisibility] = useState(plantContentsData.public);
  const handleVisibility = () => {
    setVisibility(!visibility);
    handleUpdateVisibility(!visibility, userId, collectionID);
  };

  const map: mapObject = {
    true: "Collection is now public",
    false: "Collection is now private",
  };

  interface mapObject {
    [key: string]: string;
  }

  const handleUpdateVisibility = async (
    visibility: boolean,
    userId: string,
    collectionID: string
  ) => {
    const response = await fetch("/api/collections/updatePublicAPI", {
      method: "PATCH",
      body: JSON.stringify({ visibility, userId, collectionID }),
    });
    const data = await response.json().then((data) => {
      toast.success(`${map[String(visibility)]}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
        hideProgressBar: false,
        style: { backgroundColor: "#c1e1c1", color: "#000000" },
      });
    });
  };

  return (
    <>
      <div className="bg-orange-100 bg-opacity-70 rounded-xl p-10 py-10 flex flex-col gap-3 w-full min-h-[90vh] justify-center items-center relative">
        <div className="flex flex-row items-center justify-center relative">
          <h1 className=" text-black flex justify-center mb-2 xs:text-xl sm:text-2xl md:text-3xl backdrop-blur-sm w-full">
            {collectionName}'s content{" "}
          </h1>
          <div className="absolute -right-7 -bottom-0.5">
            {editCollectionNameButton()}
          </div>
        </div>
        <label className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800 text-xs absolute right-3 top-3">
          <input
            id="Toggle3"
            type="checkbox"
            className="hidden peer"
            checked={!visibility}
            onChange={handleVisibility}
          />
          <div
            className={`px-2 py-1 rounded-l-md dark:bg-green-300 peer-checked:dark:bg-yellow-50 transition-all duration-300 ease-in-out
            `}
          >
            Public
          </div>
          <div
            className={`px-2 py-1 rounded-r-md dark:bg-yellow-50 peer-checked:dark:bg-red-200 transition-all duration-300 ease-in-out
            `}
          >
            Private
          </div>
        </label>
        <div className="flex flex-col pt-2 pb-1 w-full gap-3">
          <div className="flex flex-col items-center justify-center relative">
            <div className="border-slate-500 border rounded-xl w-[90%] p-2 font-extralight relative backdrop-blur-md">
              {collectionDescription ||
                "You have no description for this collection yet, please add one to tell us about it!"}
              <div className="absolute -bottom-3 -right-3">
                {showChangeButton()}
              </div>
            </div>
          </div>
          <div className="ml-1">
            {plantContents.length > 0 && (
              <div className="flex text-blue-500 underline-offset-2 hover:underline text-sm backdrop-blur-sm hover:text-blue-600">
                <Link href={`/c/${collectionID}/`}>
                  View public collection page of {plantContentsData.name}
                </Link>
              </div>
            )}
          </div>
        </div>

        {plantsToShow()}

        {plantstoAdd.length ? (
          <div>
            <button
              onClick={handleAddPlantClick}
              className="bg-green-300 border-sky-300 rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 hover:border-red-300 hover:text-[#ec9e69]
              ease-in-out duration-300 mt-5
            hover:bg-[#fffbcc]"
            >
              Add Plant <FaSeedling />
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleCreatePlanClick}
              className="hover:bg-green-300 hover:text-green-600 rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 hover:border-red-300 text-[#ec9e69] ease-in-out duration-300 bg-[#fffbcc] mt-5"
            >
              Create a plant <FaSeedling />
            </button>
          </div>
        )}
      </div>

      <CSSTransition
        in={showAddPlant}
        timeout={1000}
        classNames="fade"
        unmountOnExit
        mountOnEnter
        nodeRef={transitionRef}
      >
        <div
          ref={transitionRef}
          className="fixed z-50 top-0 right-0 left-0 bottom-0 h-[100vh] w-[100vw] bg-[rgb(0,0,0,.5)] "
        ></div>
      </CSSTransition>

      <CSSTransition
        in={showAddPlant}
        timeout={1000}
        classNames="page"
        unmountOnExit
        mountOnEnter
        nodeRef={transitionRef2}
      >
        <AddUniquePlantToCollection
          usersPlants={plantstoAdd}
          collectionId={collectionID}
          userId={userId}
          onSubmit={onSubmitFromParent}
          onClose={handleOnClose}
          forwardRef={transitionRef2}
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
        destination: "/",
        permanent: false,
      },
    };
  }

  const { collectionID } = context.query;

  const userId = (session.user as User).id;

  const plantContentsData = await prisma.plantCollection.findUnique({
    where: {
      id: String(collectionID),
    },
    include: {
      plantContents: {},
      owner: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
  });

  const usersUniquePlants = await prisma.uniquePlant.findMany({
    where: {
      ownerId: userId,
    },
  });

  return {
    props: {
      userId,
      plantContentsData: JSON.parse(JSON.stringify(plantContentsData)),
      usersUniquePlants: JSON.parse(JSON.stringify(usersUniquePlants)),
      collectionID: String(collectionID),
    },
  };
}

async function handleUpdate(
  data: string,
  reload: any,
  userId: string,
  collectionID: string
) {
  const response = await fetch(
    `/api/collections/updateCollectionDescriptionAPI`,
    {
      method: "PATCH",
      body: JSON.stringify({
        description: data,
        collectionId: collectionID,
        userId: userId,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.log(error.message);
    toast.error(error.message, {
      position: "top-center",
      autoClose: 5000,
      style: { fontWeight: "bold", backgroundColor: "#FECACA" },
    });
    return;
  } else {
    reload(data);
    toast.success("Updated Successfully", {
      position: "top-center",
      autoClose: 5000,
      style: { fontWeight: "bold", backgroundColor: "#C6F6D5", color: "black" },
    });
    return await response.json();
  }
}

async function handleUpdateName(
  data: string,
  reload: any,
  userId: string,
  collectionID: string
) {
  const response = await fetch(`/api/collections/updateCollectionNameAPI`, {
    method: "PATCH",
    body: JSON.stringify({
      name: data,
      collectionId: collectionID,
      userId: userId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error.message);
    toast.error(error.message, {
      position: "top-center",
      autoClose: 5000,
      style: { fontWeight: "bold", backgroundColor: "#FECACA" },
    });
    return;
  } else {
    reload(data);
    toast.success("Collection Name Updated Successfully", {
      position: "top-center",
      autoClose: 5000,
      style: { fontWeight: "bold", backgroundColor: "#C6F6D5", color: "black" },
    });
    return await response.json();
  }
}
