import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import DeleteUniquePlantButton from "@/components/DeleteUniquePlantButton";
import { useRouter } from "next/router";
import UpdateDataComponent from "@/components/UpdatePlantDetailsComponent";
import { toast } from "react-toastify";
import { useState } from "react";

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
  species: string;
  species2: string | null | undefined;
  water: string | null | undefined;
  light: string | null | undefined;
  plantHeight: string | null | undefined;
  plantWidth: string | null | undefined;
  description: string | null | undefined;
  image: string;
  userId: string;
}

type fieldName = keyof fieldState;

interface fieldState {
  name: boolean;
  species: boolean;
  species2: boolean;
  water: boolean;
  light: boolean;
  plantHeight: boolean;
  plantWidth: boolean;
  description: boolean;
  image: boolean;
}

interface plantInfoProps {
  plantInfo: Plant;
  userId: string;
}

interface MyObject {
  [key: string]: any;
}

export default function plantDisplay({ plant, userId }: any) {
  const plantData = plant;
  const router = useRouter();

  const [fieldsChangeButton, setFieldsChangeButton] = useState<fieldState>({
    name: false,
    species: false,
    species2: false,
    water: false,
    light: false,
    plantHeight: false,
    plantWidth: false,
    description: false,
    image: false,
  });

  const reload = () => {
    router.push(router.asPath);
  };

  function onDelete() {
    // router.push("/myplants");
    router.back();
  }

  const showChangeButton = (field: fieldName) => {
    const props = { field, userId, plantInfo: plantData };
    return (
      <UpdateDataComponent
        field={field}
        userId={userId}
        plantInfo={plantData}
        onConfirm={(data: string) => handleUpdate(field, props, data, reload)}
      />
    );
  };

  return (
    <div className="bg-red-200 p-4 flex flex-col gap-1">
      <h1 className="underline text-lg text-green-400 flex items-center justify-center">
        {plantData.name}'s information displayed below{" "}
      </h1>
      <div className="flex xs:flex-col md:flex-row gap-4 items-center">
        <img
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]"
          src={plantData.image}
          alt={plantData.name}
        />
        <div className="flex flex-col gap-2 border-2 border-cyan-300">
          <div className="flex items-center">
            {showChangeButton("name")}
            <p className="">Name: {plantData.name} </p>
          </div>
          <div className="flex">
            {showChangeButton("species")}
            <p>Species: {plantData.species}</p>
          </div>
          <div className="flex">
            {showChangeButton("species2")}
            <p>Secondary Species: {plantData.species2 || "None provided"}</p>
          </div>
          <div className="flex">
            <div>{showChangeButton("water")}</div>
            <p>Watering Schedule: {plantData.water || "None provided"}</p>{" "}
          </div>
          <div className="flex">
            <div>{showChangeButton("light")}</div>
            <p>Sunlight: {plantData.light || "None provided"} </p>{" "}
          </div>
          <div className="flex">
            <div>{showChangeButton("plantHeight")}</div>
            <p>Height: {plantData.plantHeight || "None provided"} </p>{" "}
          </div>
          <div className="flex">
            <div>{showChangeButton("plantWidth")}</div>
            <p>Width: {plantData.plantWidth || "None provided"} </p>{" "}
          </div>
          <div className="flex">
            <div>{showChangeButton("description")}</div>
            <p className="text-left">Description:</p>
            <div className="flex flex-col items-center justify-center">
              <div className="border w-[95%] p-2">{plantData.description}</div>
            </div>
          </div>
          {/* {plantData.collectionsPartOf.length > 0 && (
            <div className="border">
              <ul>
                Collections this plant is part of:
                {plantData.collectionsPartOf.map((collection: MyObject) => (
                  <li key={collection.id}>{collection.name}</li>
                ))}
              </ul>
            </div>
          )} */}
          <DeleteUniquePlantButton
            uniquePlantId={plantData.id}
            user={userId}
            onConfirm={onDelete}
          />
        </div>
      </div>
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

  const userId = (session.user as User).id;
  const plant = await prisma.uniquePlant.findUnique({
    where: {
      id: String(context.params.plantId),
    },
    include: {
      ownedBy: {
        select: {
          id: true,
          name: true,
          nickname: true,
        },
      },
      collectionsPartOf: true,
    },
  });

  return {
    props: {
      plant: JSON.parse(JSON.stringify(plant)),
      userId,
    },
  };
}

async function handleUpdate(
  field: fieldName,
  props: plantInfoProps,
  data: string,
  reload: any
) {
  const response = await fetch(`/api/uniqueplants/updateUniquePlantAPI`, {
    method: "PATCH",
    body: JSON.stringify({
      field: field,
      userId: props.userId,
      plantInfo: props.plantInfo,
      data: data,
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
    reload();
    toast.success("Updated Successfully", {
      position: "top-center",
      autoClose: 5000,
      style: { fontWeight: "bold", backgroundColor: "#C6F6D5" },
    });
    return await response.json();
  }
}
