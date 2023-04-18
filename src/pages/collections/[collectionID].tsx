import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { useState, useEffect } from "react";
import AddUniquePlantToCollection from "@/components/AddUniquePlantToCollection";

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
}

export default function ThisCollection({
  plants,
  plantContentsData,
  userId,
  usersUniquePlants,
}: PlantsProps) {
  const [showAddPlant, setShowAddPlant] = useState(false);

  const handleAddPlantClick = (e: any) => {
    e.preventDefault();
    setShowAddPlant(true);
  };

  const showAddPlantForm = !showAddPlant ? (
    <div>
      <button onClick={handleAddPlantClick}>Add Plant</button>
    </div>
  ) : (
    <AddUniquePlantToCollection usersPlants={usersUniquePlants} />
  );

  return (
    <div>
      <h1 className="text-cyan-500 underline text-lg">
        {plants[0].name}'s content
      </h1>

      <ul>
        {plantContentsData.plantContents.map((plantContent: any) => (
          <li key={plantContent.id}>
            <p>Plant ID: {plantContent.id.toUpperCase()}</p>
            <p>Plant Name: {plantContent.uniquePlant.name}</p>
            <p>Plant Owner ID: {plantContentsData.owner.name}</p>
            <img
              className="w-[200px] h-[200px]"
              src={plantContent.uniquePlant.image}
              alt={plantContent.uniquePlant.name}
            />
          </li>
        ))}
      </ul>
      {showAddPlantForm}
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

  const plants = await prisma.plantCollection.findMany({
    where: {
      id: String(collectionID),
    },
    include: {
      plantContents: {
        include: {
          uniquePlant: true,
        },
      },
      owner: true,
    },
  });

  const plantContentsData = await prisma.plantCollection.findUnique({
    where: {
      id: String(collectionID),
    },
    include: {
      plantContents: {
        include: {
          uniquePlant: true,
        },
      },
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
      plants,
      userId,
      plantContentsData,
      usersUniquePlants,
    },
  };
}
