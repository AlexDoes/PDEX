import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import DeleteUniquePlantButton from "@/components/DeleteUniquePlantButton";
import { useRouter } from "next/router";
import UpdateDataComponent from "@/components/UpdatePlantDetailsComponent";
import { toast } from "react-toastify";
import { useState } from "react";
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

  const updatedDate = new Date(plantData.updatedAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="bg-orange-100 rounded-xl p-10 py-10 flex flex-col gap-1 w-full">
      <h1 className=" text-[#a0cfa0] flex items-center justify-center mb-2 xs:text-xl sm:text-2xl">
        {plantData.name}'s information displayed below{" "}
      </h1>
      <div className="flex xs:flex-col md:flex-row gap-4 items-center">
        <img
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-xl cursor-pointer"
          src={plantData.image}
          alt={plantData.name}
          onClick={() => {
            window.open(plantData.image, "_blank");
          }}
        />
        <div className="flex flex-col gap-2 border border-cyan-300 rounded-2xl p-3 w-full">
          <div className="flex items-center">
            {showChangeButton("name")}
            <div className="gap-1 flex">
              Name: <p className="font-light"> {plantData.name}</p>
            </div>
          </div>
          <div className="flex">
            {showChangeButton("species")}
            <div className="gap-1 flex">
              Species: <p className="font-light"> {plantData.species}</p>
            </div>
          </div>
          <div className="flex">
            {showChangeButton("species2")}
            <div className="gap-1 flex">
              Secondary Species:{" "}
              <p className="font-light">
                {" "}
                {plantData.species2 || "None provided"}
              </p>
            </div>
          </div>
          <div className="flex">
            <div>{showChangeButton("water")}</div>
            <div className="gap-1 flex">
              Watering schedule:{" "}
              <p className="font-light">
                {" "}
                {plantData.water || "None provided"}
              </p>
            </div>
          </div>
          <div className="flex">
            <div>{showChangeButton("light")}</div>
            <div className="gap-1 flex">
              Sunlight:{" "}
              <p className="font-light">
                {" "}
                {plantData.light || "None provided"}
              </p>
            </div>
          </div>
          <div className="flex">
            <div>{showChangeButton("plantHeight")}</div>
            <div className="gap-1 flex">
              Height:{" "}
              <p className="font-light">
                {" "}
                {plantData.plantHeight || "None provided"}
              </p>
            </div>
          </div>
          <div className="flex">
            <div>{showChangeButton("plantWidth")}</div>
            <div className="gap-1 flex">
              Width:{" "}
              <p className="font-light">
                {" "}
                {plantData.plantWidth || "None provided"}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div>{showChangeButton("description")}</div>
              <p className="text-left">Description:</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="border-slate-400 border rounded-xl w-[80%] p-2 font-extralight">
                {plantData.description || "None provided please add one"}
              </div>
            </div>
          </div>
          <div className="w-inherit flex justify-between item-center">
            <div className="flex items-center hover:text-blue-600hover:underline">
              {" "}
              <Link
                href={`/p/${plantData.id}`}
                className="text-blue-400 font-light"
              >
                Public view of {plantData.name}
              </Link>
            </div>
            <DeleteUniquePlantButton
              uniquePlantId={plantData.id}
              user={userId}
              objectName={plantData.name}
              onConfirm={onDelete}
              liked={false}
            />
          </div>
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
