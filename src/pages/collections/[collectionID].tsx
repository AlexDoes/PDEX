import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

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

interface PlantsProps {
  plants: Plant[];
  plantContentsData: any;
  userId: string;
}

export default function ThisCollection({
  plants,
  plantContentsData,
  userId,
}: PlantsProps) {
  console.log(plantContentsData);
  // console.log(plantContentsData.owner.name);
  console.log(plants);
  console.log(userId);

  return (
    <div>
      <h1 className="text-cyan-500 underline text-lg">
        {plants[0].name}'s content
      </h1>

      {/* <ul>
        {plants.map((plant: any) =>
          plant.plantContents.map((plantContent: any) => (
            <li key={plantContent.id}>
              <p>Plant ID: {plantContent.id.toUpperCase()}</p>
              <p>Plant Name: {plantContent.uniquePlant.name}</p>
              <p>Plant Owner ID: {plant.owner.name}</p>
              <img
                className="w-[200px] h-[200px]"
                src={plantContent.uniquePlant.image}
                alt={plantContent.uniquePlant.name}
              />
            </li>
          ))
        )}
      </ul> */}

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

  return {
    props: {
      plants,
      userId,
      plantContentsData,
    },
  };
}
