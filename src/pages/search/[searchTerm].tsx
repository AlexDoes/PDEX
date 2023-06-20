import { bool } from "aws-sdk/clients/signer";
import prisma from "lib/prisma";
import avatarImage from "public/images/avatar.jpg";
import { useEffect, useState } from "react";
import { useRef } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { usePreviousScrollPosition } from "@/components/PreviousScrollPosition";
import ScreenChecker from "@/components/ScreenChecker";
import Link from "next/link";

interface Props {
  searchTerm: string;
  uniquePlants: uniquePlant[];
  users: users[];
  collections: any;
}

interface uniquePlant {
  name: string;
  species: string;
  image: string;
  description: string;
  plantHeight: number;
  plantWidth: number;
  plantDepth: number;
  plantWeight: number;
  plantContents: any;
  plantCollection: any;
  id: string;
  ownedBy: users;
}

interface species {
  name: string;
  species: string;
}

interface users {
  name: string;
  nickname: string;
  image: string;
  _count: any;
  ownedPlants: any;
}

export default function SearchResult({
  searchTerm,
  uniquePlants,
  users,
  collections,
}: Props) {
  const plantRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);

  const goToPlant = () => {
    plantRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToUser = () => {
    userRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToCollection = () => {
    collectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [filtered, setFiltered] = useState<boolean>(false);
  const speciesButton = (species: string) => {
    return (
      <button
        className={`bg-green-400
        hover:bg-green-500
        text-white font-light py-1 px-4 rounded
        focus:outline-none focus:shadow-outline
        transition-all duration-500 ease-in-out
        ${filtered ? "bg-green-500" : ""}
    `}
        onClick={() => {
          setShowPlant(!showPlant);
          setFiltered(!filtered);
        }}
      >
        {!filtered ? `Species` : "Show all"}
      </button>
    );
  };

  const [showPlant, setShowPlant] = useState<boolean>(true);

  const filter = (searchTerm: string, species: string) => {
    if (showPlant) return "";
    if (species && species.includes(searchTerm)) {
      return "";
    } else {
      return "hidden";
    }
  };

  return (
    <div className="w-full scroll-auto">
      <div className="flex flex-col mb-2 gap-2 bg-opacity-30" ref={searchRef}>
        <div className=" pb-2 pt-2 text-2xl text-white flex flex-row gap-1 xs:backdrop-blur-[2px] sm:backdrop-blur-none ">
          Search Results for
          <div className="text-green-200">'{searchTerm}':</div>
        </div>
        <div
          className={`flex gap-4 items-center
        ${uniquePlants.length > 0 ? `visible` : `hidden`}
      `}
        >
          <div
            className="w-full flex xs:flex-row sm:gap-4 xsss:flex-col
          xs:gap-3"
          >
            <div className="flex gap-1 border-slate-300 pb-2 items-center">
              <p className="text-white">Filter by: </p>
              {speciesButton(searchTerm)}
            </div>
            <div className="flex gap-1 border-slate-300 pb-2 items-center">
              <p className="text-white">Jump to:</p>
              <div className="flex gap-2">
                <button
                  className="bg-green-400
                        hover:bg-green-500
                        text-white font-light py-1 px-4 rounded
              "
                  onClick={goToPlant}
                >
                  Plants
                </button>
                <button
                  className={`bg-[#c4d78b] hover:bg-[#92ad43] text-white font-light py-1 px-4 rounded
          ${collections.length > 0 ? `visible` : `hidden`}
          `}
                  onClick={goToCollection}
                >
                  Collections
                </button>
                <button
                  className={`bg-blue-400 hover:bg-blue-500 text-white font-light py-1 px-4 rounded
          ${users.length > 0 ? `visible` : `hidden`}
          `}
                  onClick={goToUser}
                >
                  Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <p
          className={`${uniquePlants.length < 1 ? "hidden" : ""} 
          text-2xl text-white text-center
          bg-yellow-100
          bg-opacity-30
          rounded-lg
          text-shadow-sm
          shadow-md
          w-[100%]
          p-2
          backdrop-invert-[40%]
        `}
        >
          Community plants related to `{searchTerm}`
        </p>
        <div
          className={`
          rounded-xl p-2 m-2
          items-center justify-center
          flex
          xs:flex-col sm:flex-row 
          md:flex-row lg:flex-row 
          flex-wrap 
          xl:flex-row xl:flex-wrap
            xs:relative
            ${uniquePlants.length < 1 ? "hidden" : ""}
  `}
          ref={plantRef}
        >
          {uniquePlants.length ? (
            uniquePlants.map((plant) => (
              <Link href={`/p/${plant.id}`} key={plant.id}>
                <div
                  id="glassBackPlant"
                  key={plant.id}
                  className={`border-2 border-[#c1e1c1] rounded-xl p-2 m-2 pt-4 pb-6 items-center justify-center flex flex-col xs:w-[80vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] group
                focus:focus-within hover:relative hover:transition-all focus:transition-all md:h-min-[492px] focus:outline-none bg-orange-100 max-w-[325px]
                ${filter(searchTerm, plant.species)}
            `}
                  tabIndex={0}
                >
                  {plant.image ? (
                    <div className="flex items-center justify-center rounded-lg ">
                      <img
                        src={plant.image}
                        alt=""
                        className="
                    rounded-xl
                    xs:h-[40vh] xs:w-[50vw] 
                    sm:h-[40vh] sm:w-[40vw] 
                    md:h-[40vh] md:w-[30vw] 
                    sm:max-w-[240px]
                    md:max-w-[300px]
                    sm:max-h-[300px]
                    md:max-w-70 
                    lg:max-w-80 lg:w-60 
                    xl:w-60
                    "
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="font">{plant.name}</p>
                  <p className="font-light italic text-gray-600">
                    {plant.species || `Unlisted Species`}
                  </p>
                  <p className="font-light">
                    By {plant.ownedBy.nickname || `Anonymous User`}
                  </p>
                  <p
                    className="
                border
                bg:backdrop-blur-sm
                group-hover:bg-opacity-50
                group-hover:border-slate-400
                rounded-lg
                w-[80%]
                overflow-x-hidden
                xs:max-h-[92px]
                md:h-[92px]
                lg:h-[90px]
                xl:h-[90px]
                min-h-[90px]
                overflow-y-auto
                ellipsis
                text-center
                flex
                p-1
                xs:text-sm sm:text-sm md:text-md
                scrollbar-thin scrollbar-thumb-[#C1E1C1]
                scrollbar-rounded-lg justify-center
              "
                  >
                    {plant.description
                      ? plant.description
                      : `There's not much known about ${plant.name} yet but check back later when ${plant.ownedBy.nickname} tells us more about it!`}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No plants found related to `{searchTerm}`</p>
          )}
        </div>
        {collections.length > 0 && (
          <div>
            <div className="">
              <p
                className={`${collections.length < 1 ? "hidden" : ""}
                text-xl text-white text-center
              bg-yellow-100
                bg-opacity-30
                rounded-lg
                text-shadow-sm
                shadow-md
                w-[100%]
                p-2
                backdrop-invert-[40%]
                `}
              >
                Collections related to `{searchTerm}`
              </p>
              <div
                className="rounded-xl p-2 m-2 items-center justify-center flex xs:flex-col sm:flex-row md:flex-row lg:flex-row flex-wrap xl:flex-row xl:flex-wrap xl:row-3"
                ref={collectionRef}
              >
                {collections.map((plantCollection: any) => (
                  <Link
                    href={`/c/${plantCollection.id}`}
                    key={plantCollection.id}
                    className=""
                  >
                    <div
                      id="glassBackCollection"
                      key={plantCollection.id}
                      className="border[#c1e1c1] xs:max-w-[325px] rounded-xl p-2 m-2 pt-4 pb-6 bg-[#c1e1c1] bg-opacity-80 flex gap-4 items-center justify-center flex-col xs:w-[80vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] xl:w-[22vw] focus:focus-within hover:relative hover:transition-all focus:transition-all focus:outline-none w-full "
                    >
                      {plantCollection.plantContents[0]?.image && (
                        <div className="flex items-center justify-center rounded-lg ">
                          <img
                            src={plantCollection.plantContents[0].image}
                            alt=""
                            className="rounded-xl
                            xs:h-[40vh] xs:w-[50vw] 
                            sm:h-[40vh] md:h-[40vh] 
                            sm:w-[40vw] md:w-[30vw] 
                            md:max-w-70 lg:w-60 xl:w-60
                            max-h-[300px]
                            lg:max-w-80
                            sm:max-w-[80]"
                          />
                        </div>
                      )}
                      <div className="flex flex-col items-center justify-cente w-full">
                        <div>{plantCollection.name}</div>
                        <div>
                          Collection by -{" "}
                          <span className="italic">
                            {plantCollection.owner.nickname ||
                              plantCollection.owner.name.split(" ")[0]}
                          </span>
                        </div>
                        <div
                          className="font-light italic
                        "
                        >
                          Contains {plantCollection._count.plantContents}{" "}
                          {plantCollection._count.plantContents !== 1
                            ? "plants"
                            : "plant"}
                        </div>
                        <p
                          className="
                border
                bg:backdrop-blur-sm
                group-hover:bg-opacity-50
                group-hover:border-slate-400
                rounded-lg
                w-[80%]
                overflow-x-hidden
                xs:max-h-[92px]
                md:h-[92px]
                lg:h-[90px]
                xl:h-[90px]
                max-h-[80px]
                min-h-[92px]
                overflow-y-auto
                ellipsis
                text-center
                flex
                p-1
                xs:text-sm sm:text-sm md:text-md
                scrollbar-thin scrollbar-thumb-[#C1E1C1]
                scrollbar-rounded-lg justify-center
              "
                        >
                          {plantCollection.description
                            ? plantCollection.description
                            : `There's not much known about ${
                                plantCollection.name
                              } yet but check back later when ${
                                plantCollection.owner.nickname ||
                                plantCollection.owner.name.split(" ")[0]
                              } tells us more about it!`}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        <h2
          ref={userRef}
          className="          text-3xl text-white text-center
          bg-yellow-100
          bg-opacity-30
          rounded-lg
          text-shadow-sm
          shadow-md
          w-[100%]
          p-2
          backdrop-invert-[40%]
          "
        >
          {uniquePlants.length === 0 && users.length === 0
            ? `Results`
            : `Users`}
        </h2>
        <div
          className=" 
          rounded-xl p-2 m-2
          items-center justify-center
          flex
          xs:flex-col sm:flex-row 
          md:flex-row lg:flex-row 
          flex-wrap 
          xl:flex-row xl:flex-wrap xl:row-3
          "
          ref={userRef}
        >
          {users.length ? (
            users.map((user) => (
              <Link href={`/u/${user.nickname}`} key={user.nickname}>
                <div key={user.nickname} className="">
                  <div
                    id="glassBackCard"
                    className="border-4 border-[#c1e1c1] rounded-xl p-4 m-2 pt-4 pb-6 bg-blue-200 flex gap-4 items-center justify-center flex-col xs:w-[80vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] xl:w-[22vw] focus:focus-within hover:relative hover:transition-all focus:transition-all focus:outline-none max-w-[325px]
                    max-h-[450px] xsss:w-[100vw]"
                    tabIndex={0}
                  >
                    <div className="flex items-center justify-center rounded-lg">
                      <img
                        src={user.image || avatarImage.src}
                        alt=""
                        className="
                    border-green-400
                    rounded-xl
                    md:max-w-70 
                    lg:max-w-80
                    lg:w-64
                    xs:h-[40vh] xs:w-[50vw] 
                    sm:h-[30vh] md:h-[40vh] lg:h-80
                    sm:w-[40vw] md:w-[35vw] md:max-w-[30vw]
                    sm:max-w-[80]
                    md:max-h-[300px]
                    xsss:max-h-[40vh]
                    xsss:max-w-[400px]
                    xsss:w-[75vw]
                    "
                      />
                    </div>
                    <p>{user.nickname}</p>
                    <p>
                      {user._count?.ownedPlants ? (
                        <span>
                          {user._count.ownedPlants}{" "}
                          {user._count.ownedPlants > 1
                            ? "plants 💚"
                            : "plant 🪴"}
                        </span>
                      ) : (
                        "Sprouting soon 🌱"
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-[#ffffff] text-3xl font-semibold backdrop-blur-[3px] p-4 rounded-lg">
              {uniquePlants.length !== 0 && collections.length !== 0
                ? `No users found with the name ${searchTerm}`
                : `No results found for searching ${searchTerm}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const searchTerm = context.params.searchTerm;
  const uniquePlants = await prisma.uniquePlant.findMany({
    where: {
      OR: [
        {
          species: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
        {
          species2: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm as string,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      ownedBy: {
        select: {
          nickname: true,
        },
      },
    },
    take: 30,
  });

  const users = await prisma.user.findMany({
    where: {
      nickname: {
        contains: searchTerm as string,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      nickname: true,
      image: true,
      _count: {
        select: {
          ownedPlants: true,
        },
      },
    },
    take: 10,
  });

  const collections = await prisma.plantCollection.findMany({
    where: {
      name: {
        contains: searchTerm as string,
        mode: "insensitive",
      },
      public: true,
      plantContents: {
        some: {},
      },
    },
    select: {
      id: true,
      name: true,
      ownerId: true,
      owner: {
        select: {
          nickname: true,
          name: true,
        },
      },
      description: true,
      _count: {
        select: {
          plantContents: true,
        },
      },
      plantContents: {
        take: 1,
        select: {
          image: true,
          species: true,
        },
      },
    },
    take: 10,
  });

  return {
    props: {
      searchTerm,
      uniquePlants: JSON.parse(JSON.stringify(uniquePlants)),
      users,
      collections,
    },
  };
}
