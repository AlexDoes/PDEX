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
    if (plantCollection.length === 0) {
      return (
        <div
          className="
            text-xl font-light
            max-w-[800px]
            min-w-[60vw]
            h-[100px]
            flex items-center justify-center
          "
        >
          Still currating
        </div>
      );
    }

    return plantCollection.map((collection: any) => {
      if (boxesToShow < 4) {
        boxesToShow++;
        return (
          <div
            className="flex-row flex
            items-center justify-between w-[98%] h-full
            border-slate-300 border rounded-xl p-2
            bg-opacity-50 bg-green-200
            md:gap-5
            lg:gap-4
            xl:gap-1
          "
          >
            <div
              className="
                flex flex-col
                w-full
                gap-1
              "
            >
              <p
                className="
                  text-xl indent-3
                  xl:indent-5
                "
              >
                {collection.name}
              </p>
              <div className="w-full h-[100px]">
                <div
                  className="
                  h-[100px] 
                  w-[80%]
                  xl:w-[95%]
                  md:w-[95%]
                  lg:w-[95%]
                  sm:w-[95%]
                  "
                >
                  <p
                    className="              
                      overflow-auto 
                      font-light
                      mx-3
                      xs: text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]
                      h-full bg-[#FFF4BD] pl-3 pr-3 pt-2 pb-2 rounded-md
                      scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
                      scrollbar-rounded-sm
                      w-[100%]
                      "
                  >
                    {collection.description || "Check out this collection."}
                  </p>
                </div>
                {/* <div>{collection.plantContents.length} plants</div> */}
              </div>
            </div>
            <div
              id="profileCollectionImage"
              className="
                min-w-[200px] min-h-[200px]
                rounded-lg
                w-[200px] h-[200px]
                sm:max-w-[300px] sm:max-h-[300px]
                lg:max-w-[300px] lg:max-h-[300px]
                xl:max-w-[300px] xl:max-h-[300px]
                flex justify-center items-center
                bg-opacity-50 bg-yellow-200
                border border-slate-300
                "
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
                  className="flex justify-center items-center h-[200px] w-[200px]
                  "
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
    if (ownedPlants.length === 0) {
      return (
        <div
          className="
        text-xl font-light
        max-w-[800px]
        min-w-[60vw]
        h-[100px]
        flex items-center justify-center
      "
        >
          Sprouting soon 🌱{" "}
        </div>
      );
    }

    return ownedPlants.map((plant: any) => {
      return (
        <div
          className="flex-row flex
            w-[98%] 
            border border-slate-300
            justify-between items-center  
            bg-opacity-80 bg-orange-100
            h-full
            rounded-lg p-2
            md:gap-5
            lg:gap-4
            xl:gap-1
          "
        >
          <div className="flex flex-col justify-center w-full">
            <p
              className="text-xl indent-3
            xl:indent-5
            "
            >
              {plant.name}
            </p>
            <p
              className="text-lg 
              indent-3 font-extralight italic
              xl:indent-5
            "
            >
              {plant.species}
            </p>
            <div
              className="h-[100px] 
                w-[80%]
                xl:w-[95%]
                md:w-[95%]
                lg:w-[95%]
                sm:w-[95%]
              "
            >
              <p
                className="
                  overflow-auto
                  font-light
                  mx-3
                  xs: text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]
                  h-full bg-[#FFF4BD] pl-3 pr-3 pt-2 pb-2 rounded-md
                  scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
                  scrollbar-rounded-sm
                  w-[100%]
                "
              >
                {plant.description}
              </p>
            </div>
          </div>
          <div className="w-[200px] h-[200px]">
            <img
              className="min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px] rounded-lg"
              src={plant.image}
              alt="Plant Image"
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="
      xs:mt-2
      md:flex md:flex-row md:justify-center mt-5
      md:gap-2
    "
    >
      <div className="absolute bottom-0 left-0 z-10">
        <ScreenChecker />
      </div>
      <div
        className="
        md:flex md:flex-col
        gap-2
        border-2
        h-full
        rounded-xl
        bg-opacity-60 bg-green-100
        md:p-4
        "
      >
        <div
          id="usersProfileDisplayImageAndName"
          className="
            xs:flex xs: flex-row xs:items-center
            sm:flex sm:flex-row sm:justify-center sm:items-center
            border-green-400 
            md:flex md:flex-col md:items-center
            gap-2 
          "
        >
          <div
            id="usersProfileDisplayImage"
            className="
              xs:w-[150px] xs:h-[100px]
              sm:h-full
              sm:ml-3
              md:w-full md:h-full
              xs:mt-5
              flex justify-center 
              sm:flex-row sm:justify-center sm:items-center
              xs:flex-row xs:justify-center xs:items-center
             border-red-300
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
                sm:w-[20vw] sm:h-[20vw]
                md:w-[50vw] md:h-[50vw]
                sm:max-w-[300px] sm:max-h-[300px]
                md:max-w-[300px] md:max-h-[300px]
                lg:w-[300px] lg:h-[300px]
                xl:w-[300px] xl:h-[300px]
            "
            />
          </div>
          <div
            className="
            flex 
            md:justify-start md:items-start
            w-full
            sm:ml-4
            md:ml-0
          "
          >
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
              text-lg font-extralight
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
            font-light
            xs:mt-2
            xs:text-xl
            sm:text-2xl
            md:text-xl
        "
        >
          {description ? description : "No description"}
        </div>
        <div
          id="profileStats"
          className="
          md:mt-2
          flex flex-row gap-1
          xs:text-lg
          font-extralight
          w-full
          xs:mb-2
          "
        >
          <div>
            🪴{" "}
            {ownedPlants.length === 1
              ? `1 plant`
              : `${ownedPlants.length}` + " plants"}
          </div>
          <p> • </p>
          <div>
            {plantCollection.length === 1
              ? `1 collection`
              : `${plantCollection.length}` + " collections"}
          </div>
        </div>
      </div>
      <div>
        <div
          className="                  
        bg-opacity-80 bg-orange-100
        backdrop-filter backdrop-blur-md
        border border-slate-300
        md:rounded-xl
        xs:rounded-t-xl
        "
        >
          <div
            className="
            xs:text-2xl
            text-xl flex
            justify-center items-center
            border-b-2
            py-1
            border-cyan-300
            w-[90%]
            mx-auto
          "
          >
            Collections
          </div>
          <div
            className="
          flex flex-col gap-2
          items-center
          py-2
          "
          >
            {collectionsToShow()}
          </div>
        </div>
        <div
          className="
        w-full
        bg-opacity-60 bg-green-200
        backdrop-filter backdrop-blur-md
        py-2
        border border-slate-300
        md:rounded-xl
        xs:rounded-b-xl
        "
        >
          <div
            className="
                      xs:text-2xl
                      text-xl flex
                      justify-center items-center
                      border-b-2
                      py-1
                      border-cyan-300
                      w-[90%]
                      mx-auto
                    "
          >
            Plants
          </div>
          <div
            className="
              flex flex-col gap-1
              items-center py-2
            "
          >
            {plantsToShow()}
          </div>
        </div>
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
