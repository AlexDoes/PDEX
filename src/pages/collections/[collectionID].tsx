import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { useState, useEffect } from "react";
import AddUniquePlantToCollection from "@/components/AddUniquePlantToCollection";
import RemoveUniquePlantFromCollectionButton from "@/components/RemoveUniquePlantFromCollectionButton";
import { useRouter } from "next/router";
import Link from "next/link";

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

  const plantstoAdd = usersUniquePlants.filter((plant) => {
    return !plantContentsData.plantContents.some(
      (plantContent: any) => plantContent.id === plant.id
    );
  });
  console.log(plantstoAdd);

  const router = useRouter();
  const handleAddPlantClick = (e: any) => {
    e.preventDefault();
    setShowAddPlant(true);
  };

  const onSubmitFromParent = () => {
    setShowAddPlant(false);
    router.push(router.asPath);
  };

  const showAddPlantForm = !showAddPlant ? (
    plantstoAdd.length ? (
      <div>
        <button onClick={handleAddPlantClick}>Add Plant</button>
      </div>
    ) : (
      <></>
    )
  ) : (
    <AddUniquePlantToCollection
      usersPlants={plantstoAdd}
      collectionId={collectionID}
      userId={userId}
      onSubmit={onSubmitFromParent}
    />
  );

  return (
    <div>
      {showAddPlantForm}
      <h1 className="text-cyan-500 underline text-lg">
        {plantContentsData.name}'s content
      </h1>

      <ul>
        {plantContentsData.plantContents.map((plantContent: any) => (
          <li key={plantContent.id}>
            <p>
              <Link href={`/myplants/${plantContent.id}`}>
                Plant ID: {plantContent.id.toUpperCase()}
              </Link>
            </p>
            <p>Plant Name: {plantContent.name}</p>
            <p>Plant Owner ID: {plantContentsData.owner.name}</p>
            <img
              className="w-[200px] h-[200px]"
              src={plantContent.image}
              alt={plantContent.name}
            />
            <div>
              <RemoveUniquePlantFromCollectionButton
                uniquePlantId={plantContent.id}
                collectionId={collectionID}
                userId={userId}
                onConfirm={onSubmitFromParent}
              />
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
