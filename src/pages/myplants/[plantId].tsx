import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

interface MyObject {
  [key: string]: any;
}

export default function plantDisplay(plant: any) {
  const plantData = plant.plant;
  const entries = Object.entries(plantData);
  console.log(plantData);
  return (
    <div>
      <h1 className="underline text-lg text-green-400">
        {plantData.name}'s information displayed below{" "}
      </h1>
      <img
        className="w-[200px] h-[200px]"
        src={plantData.image}
        alt={plantData.name}
      />
      <p>Plant ID: {plantData.id.toUpperCase()}</p>
      <p>Plant Name: {plantData.name} </p>
      <p>Plant Owner: {plantData.ownedBy.name}</p>
      <p>Plant Description: {plantData.description}</p>
      <p>Plant Species: {plantData.species}</p>
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

  const userid = (session.user as User).id;

  const plant = await prisma.uniquePlant.findUnique({
    where: {
      id: String(context.params.plantId),
    },
    include: {
      ownedBy: true,
    },
  });

  return {
    props: {
      plant,
    },
  };
}
