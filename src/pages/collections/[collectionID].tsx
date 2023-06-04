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

  const transitionRef = useRef(null);
  const transitionRef2 = useRef(null);
  const plantstoAdd = usersUniquePlants.filter((plant) => {
    return !plantContentsData.plantContents.some(
      (plantContent: any) => plantContent.id === plant.id
    );
  });

  const [plantContents, setPlantContents] = useState(
    plantContentsData.plantContents
  );

  useEffect(() => {
    setCollectionDescription(plantContentsData.description);
  }, [plantContentsData.description]);

  useEffect(() => {
    plantstoAdd;
  }, [plantstoAdd]);

  const router = useRouter();

  const handleAddPlantClick = (e: any) => {
    e.preventDefault();
    setShowAddPlant(true);
  };

  const onSubmitFromParent = (Plants: String[]) => {
    console.log(Plants);
    setShowAddPlant(false);
    // router.reload();

    router.push(router.asPath);
  };

  const onSubmitFromParentRemove = () => {
    // router.reload();
  };

  const onSubmitFromParentUpdate = (plantsAdded: String[]) => {
    setAddPlant(false);
    plantstoAdd.forEach((plant) => {
      if (plantsAdded.includes(plant.id)) {
        plantstoAdd.filter((plant) => {
          return !plantstoAdd.some(
            (plantContent: any) => plantContent.id === plant.id
          );
        });
      }
    });
    console.log(plantstoAdd);
    usersUniquePlants.forEach((plant) => {
      if (plantsAdded.includes(plant.id)) {
        setPlantContents((plantContents: any) => [
          ...plantContents,
          {
            id: plant.id,
            name: plant.name,
            image: plant.image,
          },
        ]);
      }
    });
  };

  const plantsToShow = () => {
    return (
      <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full xl:gap-2">
        {plantContents.map((plantContent: any) => (
          <div
            key={plantContent.id}
            className="flex-col items-center justify-center bg-opacity-50 bg-green-200 hover:bg-opacity-70 rounded-xl p-4 border gap-2 pt-6
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

  const reloadUponAdd = () => {};

  const showChangeButton = () => {
    return (
      <UpdateCollectionDescriptionComponent
        collectionName={plantContentsData.name}
        plantDescription={collectionDescription}
        onConfirm={(data: string) =>
          handleUpdate(data, reload, userId, collectionID)
        }
      />
    );
  };

  //   <div>
  //   <RemoveUniquePlantFromCollectionButton
  //     uniquePlantId={plantContent.id}
  //     plantName={plantContent.name}
  //     collectionId={collectionID}
  //     userId={userId}
  //     onConfirm={onSubmitFromParent}
  //   />
  // </div>

  return (
    <>
      <div className="bg-orange-100 bg-opacity-100 rounded-xl p-10 py-10 flex flex-col gap-3 w-full min-h-[90vh] justify-center items-center">
        <h1 className=" text-[#a0cfa0] flex items-center justify-center mb-2 xs:text-xl sm:text-2xl">
          {plantContentsData.name}'s content
        </h1>
        <div className="flex flex-col py-2 w-full">
          <div className="flex flex-col items-center justify-center relative border-2">
            <div className="border-slate-400 border rounded-xl w-[90%] p-2 font-extralight relative">
              {collectionDescription ||
                "You have no description for this collection yet, please add one to tell us about it!"}
              <div className="absolute -bottom-3 -right-3">
                {showChangeButton()}
              </div>
            </div>
          </div>
        </div>

        {plantsToShow()}

        {plantstoAdd.length ? (
          <div>
            <button
              onClick={handleAddPlantClick}
              className="bg-green-300 border-sky-300 border rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 hover:border-red-300 hover:text-[#ec9e69]
              ease-in-out duration-300
            hover:bg-[#fffbcc]"
            >
              Add Plant <FaSeedling />
            </button>
          </div>
        ) : null}
      </div>

      <CSSTransition
        in={showAddPlant}
        timeout={1000}
        classNames="fade"
        unmountOnExit
        mountOnEnter
        nodeRef={transitionRef}
      >
        <div ref={transitionRef} className="fixed z-50 top-0 right-0 left-0 bottom-0 h-[100vh] w-[100vw] bg-[rgb(0,0,0,.5)] "></div>
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
      style: { fontWeight: "bold", backgroundColor: "#C6F6D5" },
    });
    return await response.json();
  }
}
