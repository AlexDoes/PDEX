import { bool } from "aws-sdk/clients/signer";
import prisma from "lib/prisma";
import avatarImage from "public/images/avatar.jpg";
import { useEffect, useState } from "react";
import { useRef } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScreenChecker from "@/components/ScreenChecker";

interface Props {
  searchTerm: string;
  uniquePlants: uniquePlant[];
  users: users[];
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
}: Props) {
  const plantRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

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

  const [filtered, setFiltered] = useState<boolean>(false);
  const speciesButton = (species: string) => {
    return (
      <button
        className={`bg-green-400
        hover:bg-green-500
        text-white font-bold py-1 px-4 rounded
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

  const showUsers = () => {
    if (users.length) {
    }
  };
  return (
    <div className="w-full scroll-auto">
      <div className="flex flex-col gap-2">
        <p className="border-b-2 border-slate-300 pb-2 pt-2 text-xl">
          Search Results for `{searchTerm}`:
        </p>
        <div
          className={`flex gap-4 items-center
        ${uniquePlants.length > 0 ? `visible` : `hidden`}
      `}
        >
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 border-b-2 border-slate-300 pb-2">
              <p>Jump to:</p>
              <div className="flex gap-2">
                <button
                  className="bg-green-400
                        hover:bg-green-500
                        text-white font-bold py-1 px-4 rounded
              "
                  onClick={goToPlant}
                >
                  Plants
                </button>
                <button
                  className={`bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded
          ${users.length > 0 ? `visible` : `hidden`}
          `}
                  onClick={goToUser}
                >
                  Users
                </button>
              </div>
            </div>
            <div className="flex gap-1 border-b-2 border-slate-300 pb-2 items-center">
              <p>Filter by: </p>
              {speciesButton(searchTerm)}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p
          className={`${uniquePlants.length < 1 ? "hidden" : ""} 
          text-xl text-green-500 text-center
          bg-yellow-100
          text-shadow-sm
          shadow-md
          w-[100%]
          p-2
        `}
        >
          Community plants related to `{searchTerm}`
        </p>
        <div
          className={`border-slate-300 border rounded-xl p-2 m-2
            items-center justify-center
            flex
            xs:flex-col sm:flex-row 
            md:flex-row lg:flex-row 
            flex-wrap 
            xl:flex-row xl:flex-wrap xl:row-3
            backdrop-filter backdrop-blur-md 
            bg-opacity-50 bg-green-200
            xs:relative
            snap-mandatory
            snap-y snap-center
            ${uniquePlants.length < 1 ? "hidden" : ""}
  `}
          ref={plantRef}
        >
          {uniquePlants.length ? (
            uniquePlants.map((plant) => (
              <div
                id="glassBackPlant"
                key={plant.id}
                className={`border-2 border-[#c1e1c1] rounded-xl p-2 m-2 pt-4 pb-6 items-center justify-center flex flex-col xs:w-[80vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] hover:scale-105             focus:scale-105 focus:focus-within hover:relative hover:transition-all focus:transition-all md:h-min-[492px] focus:outline-none bg-orange-100
                ${filter(searchTerm, plant.species)}
            `}
                tabIndex={0}
              >
                {plant.image ? (
                  <div className="flex items-center justify-center rounded-lg snap-proximity">
                    <img
                      src={plant.image}
                      alt=""
                      className="
                  border-green-400
                    rounded-xl
                    border
                    xs:h-[40vh] xs:w-[50vw] 
                    sm:h-[40vh] md:h-[40vh] lg:h-80
                    sm:w-[40vw] md:w-[30vw] md:max-w-70 lg:w-80 xl:w-80
                    lg:max-w-80
                    sm:max-w-[80]
                    "
                    />
                  </div>
                ) : (
                  ""
                )}
                <p className="font">{plant.name}</p>
                <p className="font-light italic">{plant.species}</p>
                <p className="font-thin snap-y">By {plant.ownedBy.nickname}</p>
                {/* <p>Plant Id: {plant.id}</p> */}
                {/* <div className="flex items-center justify-center"> */}
                <p
                  className="
                bg-yellow-200
                rounded-lg
                w-[80%]
                overflow-x-hidden
                xs:max-h-[92px]
                md:h-[92px]
                lg:h-[90px]
                xl:h-[90px]
                max-h-[80px]
                overflow-y-auto
                ellipsis
                text-center
                flex
                p-2
                xs:text-sm sm:text-sm md:text-md
              "
                >
                  {plant.description
                    ? plant.description
                    : `There's not much known about ${plant.name} yet but check back later when ${plant.ownedBy.nickname} tells us more about it!`}
                </p>
              </div>
            ))
          ) : (
            <p>No plants found related to `{searchTerm}`</p>
          )}
        </div>
        <h2
          ref={userRef}
          className="text-2xl text-yellow-100 text-center bg-green-200
          shadow-xl
          text-shadow-sm
          p-2
          "
        >
          Users
        </h2>
        <div
          className=" border-slate-300 border
                  rounded-xl p-2 m-2
                  items-center justify-center
                  flex
                  xs:flex-col sm:flex-row 
                  md:flex-row lg:flex-row 
                  flex-wrap 
                  xl:flex-row xl:flex-wrap xl:row-3
                  backdrop-filter backdrop-blur-md
                  bg-opacity-80 bg-orange-100
      "
          ref={userRef}
        >
          {users.length ? (
            users.map((user) => (
              <div key={user.nickname} className="">
                <div
                  id="glassBackCard"
                  className="
                            border-4 
                            border-[#c1e1c1]
                            rounded-xl p-2 m-2
                            pt-4
                            pb-6
                            bg-blue-200
                            flex 
                            gap-4
                            items-center justify-center
                            flex-col
                            xs:w-[80vw]
                            sm:w-[40vw]
                            md:w-[40vw]
                            lg:w-[25vw]
                            hover:scale-105
                            focus:scale-105
                            focus:focus-within:
                            hover:relative
                            hover:transition-all
                            focus:transition-all
                            focus:outline-none
                            "
                  tabIndex={0}
                >
                  {user.image ? (
                    <div className="flex items-center justify-center rounded-lg">
                      <img
                        src={user.image}
                        alt=""
                        className="
                    border-green-400
                    rounded-xl
                    border
                    xs:h-[40vh] xs:w-[50vw] 
                    sm:h-[40vh] md:h-[40vh] lg:h-80
                    sm:w-[40vw] md:w-[35vw] md:max-w-80 lg:w-80 xl:w-80
                    sm:max-w-[80]
                    "
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg">
                      <img
                        src={avatarImage.src}
                        alt=""
                        className="
                    border-green-400
                    rounded-xl
                    border
                    xs:h-[40vh] xs:w-[50vw] 
                    sm:h-[40vh] md:h-[40vh] lg:h-80
                    sm:w-[40vw] md:w-[30vw] md:max-w-70 lg:w-80 xl:w-80
                    lg:max-w-80
                    sm:max-w-[80]
                    "
                      />
                    </div>
                  )}
                  <p>{user.nickname}</p>
                  <p>
                    {user._count?.ownedPlants ? (
                      <span>
                        {user._count.ownedPlants}{" "}
                        {user._count.ownedPlants > 1 ? "plants 💚" : "plant 🪴"}
                      </span>
                    ) : (
                      "Sprouting soon 🌱"
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No users found with the name `{searchTerm}`</p>
          )}
        </div>
      </div>
      {ScrollToTopButton()}
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

  return {
    props: {
      searchTerm,
      uniquePlants: JSON.parse(JSON.stringify(uniquePlants)),
      users,
    },
  };
}
