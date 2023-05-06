import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePreviousScrollPosition } from "@/components/PreviousScrollPosition";
import prisma from "lib/prisma";
import { toTitleCase } from "lib/generalFunctions";
import avatarImage from "public/images/avatar.jpg";
import { GiCarousel } from "react-icons/gi";
import ImageCarousel from "@/components/ImageCarouselComponent";
import ScreenChecker from "@/components/ScreenChecker";

interface Props {
  user: any;
}

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  image: string;
  description: string;
  favoritePlants: any;
  ownedPlants: any;
  plantCollection: any;
}

export default function UserProfile({ user }: Props) {
  const {
    id,
    username,
    name,
    email,
    image,
    description,
    favoritePlants,
    ownedPlants,
    plantCollection,
  } = user;

  const getImagesFromCollection = (plant: any) => {
    let images = [];
    if (plant.image) {
      images.push(plant.image);
    }
    return images;
  };

  const collectionCarousel = () => {};

  let boxesToShow = 0;

  const collectionsToShow = () => {
    return plantCollection.map((collection: any) => {
      if (boxesToShow < 4) {
        boxesToShow++;
        return (
          <div
            className="border-red-500 border-2 flex-row flex
            items-center justify-between w-[100%] h-[200px]
          "
          >
            <div
              className="
              flex flex-col
              indent-3
            "
            >
              <p className="text-xl">{collection.name}</p>
              <p className="font-light text-lg">
                {collection.description || "Check out this collection"}
              </p>
            </div>
            <div
              id="profileCollectionImage"
              className="
                w-[200px] h-[200px]
                sm:max-w-[300px] sm:max-h-[300px]
                lg:max-w-[300px] lg:max-h-[300px]
                xl:max-w-[300px] xl:max-h-[300px]
                border-2 border-cyan-500
               flex justify-center items-center"
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
                  className="flex justify-center items-center h-[200px] w-[200px]"
                >
                  <div>Coming Soon</div>
                </div>
              )}
            </div>
          </div>
        );
      }
    });
  };

  const plantsToShow = () => {
    return ownedPlants.map((plant: any) => {
      return (
        <div className="flex-row flex">
          <div className="">
            <p>{plant.name}</p>
            <p className="h-[150px] w-[80%]">{plant.description}</p>
          </div>
          <div className="w-[200px] h-[200px] border-4">
            <img src={plant.image} alt="Plant Image" />
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <ScreenChecker />
      <div
        className="border-2 border-black 
      "
      >
        <div
          id="usersProfileDisplayImageAndName"
          className="
            xs:flex xs: flex-row xs:items-center
            sm:flex sm:flex-row sm:justify-center sm:items-center
            border-green-400 border-2
          "
        >
          <div
            id="usersProfileDisplayImage"
            className="
          xs:w-[25] xs:h-[25] XS:rounded-full
          flex justify-center 
          sm:flex-row sm:justify-center sm:items-center
          xs:flex-row xs:justify-center xs:items-center
          border-2 border-red-300
          sm:max-w-[300px] sm:max-h-[300px]
          md:max-w-[300px] md:max-h-[300px]
          lg:w-[300px] lg:h-[300px]
          xl:w-[300px] xl:h-[300px]
        "
          >
            <img
              src={image ? image : avatarImage.src}
              alt="User Profile Image"
              className="rounded-full 
            xs:w-[20vw] xs:h-[20vw]
            sm:w-[50vw] sm:h-[50vw]
            md:w-[50vw] md:h-[50vw]
            sm:max-w-[300px] sm:max-h-[300px]
            md:max-w-[300px] md:max-h-[300px]
            lg:w-[300px] lg:h-[300px]
            xl:w-[300px] xl:h-[300px]
            "
            />
          </div>
          <div className="flex">
            <div
              className="
            "
            >
              <h1
                className="
              text-xl
              xs:text-2xl
              "
              >
                {toTitleCase(name)}
              </h1>
              <h2
                className="
              text-lg font-light
              xs:text-xl
              "
              >
                {toTitleCase(username)}
              </h2>
            </div>
          </div>
        </div>
        <div
          id="profileDescription"
          className="
        border-2 border-blue-400
        xs:mt-2
        xs:text-xl
        sm:text-2xl
        "
        >
          {description ? description : "No description"}
        </div>
        <div
          id="profileStats"
          className="flex flex-row gap-1
          xs:text-lg
        "
        >
          <p>
            🪴{" "}
            {ownedPlants.length === 1
              ? `1 plant`
              : `${ownedPlants.length}` + " plants"}
          </p>
          <p> • </p>
          <p>
            {plantCollection.length === 1
              ? `1 collection`
              : `${plantCollection.length}` + " collections"}
          </p>
        </div>
      </div>
      <div>
        Collection
        {collectionsToShow()}
      </div>
      <div>
        Plants
        {plantsToShow()}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const userId = String(context.params.profile).toLowerCase();

  let user;

  if (userId.length < 25) {
    user = await prisma.user.findUnique({
      where: {
        username: String(userId),
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        image: true,
        description: true,
        favoritePlants: true,
        ownedPlants: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            species: true,
            species2: true,
            plantHeight: true,
            plantWidth: true,
            plantDepth: true,
            plantWeight: true,
          },
        },
        plantCollection: {
          select: {
            id: true,
            name: true,
            description: true,
            plantContents: {
              select: {
                id: true,
                name: true,
                image: true,
                description: true,
                species: true,
                species2: true,
                plantHeight: true,
                plantWidth: true,
                plantDepth: true,
                plantWeight: true,
              },
            },
          },
        },
      },
    });
  } else {
    user = await prisma.user.findUnique({
      where: {
        id: String(userId),
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        image: true,
        description: true,
      },
    });
  }

  return {
    props: {
      user,
    },
  };
}
