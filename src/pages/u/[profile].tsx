import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePreviousScrollPosition } from "@/components/PreviousScrollPosition";
import prisma from "lib/prisma";
import { toTitleCase } from "lib/generalFunctions";
import avatarImage from "public/images/avatar.jpg";
import { GiCarousel } from "react-icons/gi";
import ImageCarousel from "@/components/ImageCarouselComponent";

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

  const profileTopDisplay =
    plantCollection.length > 0 ? (
      plantCollection.map((collection: any) => {
        return (
          <div
            id="profileCollection"
            className="border border-black min-w-[300px] min-h-[300px]"
          >
            <h2 className="text-2xl font-medium">{collection.name}</h2>
            <p>
              {collection.description ||
                `Hey checkout ${collection.name} great plant collection I made!`}
            </p>
            <div id="profileCollectionImage" className="w-[200px] h-[200px]">
              {collection.plantContents.length > 0 ? (
                <ImageCarousel
                  images={collection.plantContents.map((plant: any) => {
                    return plant.image;
                  })}
                />
              ) : (
                <div id="profileCollectionPlantImage">NO IMG</div>
              )}
            </div>
          </div>
        );
      })
    ) : (
      <div id="profileCollection" className="border border-black">
        <h2 className="text-2xl font-medium">No collections yet</h2>
      </div>
    );

  return (
    <div id="profileContainer" className="flex grid-cols-2 gap-6 mt-8">
      <div id="profileLeft" className="border border-black flex flex-col gap-5">
        <div id="profileImage">
          <img
            src={image ? image : avatarImage.src}
            alt=""
            className="rounded-full w-[300px] h-[300px] min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px] object-cover"
          />
        </div>
        <div id="userAndName">
          <div id="profileName">
            <h1 className="text-3xl font-medium">{name}</h1>
          </div>
          <div id="profileUsername">
            <h3 className="font-thin text-xl ">{toTitleCase(username)}</h3>
          </div>
        </div>
        <div id="profileDescription">
          <p>{description}</p>
        </div>
      </div>
      {/* ////////////////////////// */}
      <div id="profileRight" className="w-[60vw]">
        <div id="profileCollections">
          <h1 className="text-3xl font-medium">Collections</h1>
          <div
            id="profileCollectionsList"
            className="
            border border-2 border-blue-200
            grid grid-cols-2 gap-4
            "
          >
            {profileTopDisplay}
          </div>
        </div>
      </div>
      {/* ////////////////////////// */}
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
