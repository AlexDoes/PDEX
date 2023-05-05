import prisma from "lib/prisma";
import avatarImage from "public/images/avatar.jpg";
import { useEffect, useState } from "react";
import { useRef } from "react";

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

const breakPoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default function SearchResult({
  searchTerm,
  uniquePlants,
  users,
}: Props) {
  console.log(users);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(Number(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const screenSize = () => {
    // switch case

    if (windowWidth < breakPoints.sm && windowWidth > breakPoints.xs) {
      return "xs";
    } else if (windowWidth < breakPoints.md && windowWidth > breakPoints.sm) {
      return "sm";
    } else if (windowWidth < breakPoints.lg && windowWidth > breakPoints.md) {
      return "md";
    } else if (windowWidth < breakPoints.xl && windowWidth > breakPoints.lg) {
      return "lg";
    } else {
      return "xl";
    }
  };

  const showUsers = () => {
    if (users.length) {
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-row gap-1">
        <div
          className="                   
                     xs:text-purple-500
                    sm:text-red-400
                    md:text-blue-400
                    lg:text-green-400"
        >
          {/* Window Size: {screenSize()?.toUpperCase()} */}
        </div>
        {/* <p className="text-purple-500">purple xs: {breakPoints.xs}</p>
        <p className="text-red-500">red sm: {breakPoints.sm}</p>
        <p className="text-blue-500">blue md: {breakPoints.md}</p>
        <p className="text-green-500">green lg: {breakPoints.lg}</p> */}
      </div>
      <h1> Search Results for `{searchTerm}`</h1>
      <div className="flex gap-4 items-center">
        Jump to :
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
          className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"
          onClick={goToUser}
        >
          Users
        </button>
      </div>
      <h2 ref={plantRef}> User's personal plants related to {searchTerm}: </h2>
      <div
        className="border-black border-2
            items-center justify-center
            flex
            xs:flex-col sm:flex-row 
            md:flex-row lg:flex-row 
            flex-wrap 
            xl:flex-row xl:flex-wrap xl:row-3
        "
        ref={plantRef}
      >
        {uniquePlants.length ? (
          uniquePlants.map((plant) => (
            <div
              key={plant.id}
              className="
              border-2 
              border-red-200 
              rounded-xl p-2 m-2
              pt-4
              pb-6
              bg-orange-100
              flex 
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
            "
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
                    sm:w-[40vw] md:w-[35vw] md:max-w-80 lg:w-80 xl:w-80
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
                lg:h-[90px]
                xl:h-[90px]
                max-h-[80px]
                overflow-y-auto
                ellipsis
                text-center
                p-2
                xs:text-sm sm:text-sm md:text-md
              "
              >
                {plant.description
                  ? plant.description
                  : `There's not much known about ${plant.name} yet but check back later when ${plant.ownedBy.nickname} tells us more about it!`}
              </p>
            </div>
            // </div>
          ))
        ) : (
          <p>No plants found related to `{searchTerm}`</p>
        )}
      </div>
      <h2 ref={userRef}> Users </h2>
      <div
        className="border-2 border-black
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
            <div key={user.nickname} className="">
              <div
                className="
                            border-2 
                            border-red-200 
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
                    sm:w-[40vw] md:w-[35vw] md:max-w-80 lg:w-80 xl:w-80
                    sm:max-w-[80]
                    "
                    />
                  </div>
                )}
                <p>{user.nickname}</p>
                <p>{user._count.ownedPlants} unique plants</p>
              </div>
            </div>
          ))
        ) : (
          <p>No users found with the name `{searchTerm}`</p>
        )}
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

  return {
    props: {
      searchTerm,
      uniquePlants,
      users,
    },
  };
}
