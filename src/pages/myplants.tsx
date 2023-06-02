import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import prisma from "lib/prisma";
import CreateUniquePlant from "@/components/CreateUniquePlantFormComponent";
import { useState, useEffect } from "react";
import DeleteUniquePlantButton from "@/components/DeleteUniquePlantButton";
import { usePreviousScrollPosition } from "@/components/PreviousScrollPosition";
import { CSSTransition } from "react-transition-group";
import { RiPlantLine } from "react-icons/ri";
import { FaSeedling } from "react-icons/fa";

interface User {
  id: string;
  name: string;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

export default function MyPlants({
  items,
  userId,
  username,
  session,
  plantSpecies,
}: any) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);

  const onSubmitFromParent = () => {
    setShowForm(false);
    router.push(router.asPath);
  };

  const handleOnClose = () => {
    setShowForm(false);
  };

  const showPlantsCard = () => {
    if (items.length === 0) {
      return (
        <div
          className={`
          rounded-xl p-2 m-2
      items-center justify-center
      flex
      xs:flex-col sm:flex-row 
      md:flex-row lg:flex-row 
      flex-wrap 
      xl:flex-row xl:flex-wrap xl:row-3
      
      xs:relative
      ${showForm ? "-z-20" : "z-0"}
      `}
          tabIndex={0}
        >
          <div
            className="
            text-xl font-light
            max-w-[600px]
            min-w-[40vw]
            w-[96%]
            h-[100px]
            items-center justify-between
            border-slate-300 border rounded-xl p-2
            bg-opacity-90  bg-orange-100
            md:gap-5
            lg:gap-4
            xl:gap-1
            text-center
            flex
            m-4
          "
          >
            There are currently no collections yet, create a new collection to
            display your plants!
          </div>
        </div>
      );
    }
    return (
      <div
        className={`rounded-xl p-2 m-2
      items-center justify-center
      flex
      xs:flex-col sm:flex-row 
      md:flex-row lg:flex-row 
      flex-wrap 
      gap-4
      xl:flex-row xl:flex-wrap xl:row-3
      xs:relative
      ${showForm ? "-z-20" : "z-0"}
      `}
        tabIndex={0}
      >
        {items.map((plant: any) => {
          return (
            <div
              className=" border-[#c1e1c1] bg-orange-100 bg-opacity-70 rounded-xl p-2 pt-4 pb-6 items-center justify-center flex flex-col xs:w-[80vw] sm:w-[55vw] md:w-[40vw] lg:w-[25vw] focus:focus-within hover:relative hover:transition-all focus:transition-all md:h-min-[480px] focus:outline-none overflow-x-hidden group"
              tabIndex={0}
              key={plant.id.slice(-4)}
            >
              <div className="relative group flex">
                <Link
                  href={`/myplants/${plant.id}`}
                  className="focus:outline-none"
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="
                    rounded-xl
                    xs:h-[40vh] xs:w-[50vw] 
                    sm:h-[40vh] md:h-[40vh] lg:h-70
                    sm:w-[40vw] md:w-[30vw] md:max-w-70 lg:w-64 xl:w-64
                    lg:max-w-80
                    sm:max-w-[80] mb-2
                    hover:brightness-90
                    hover:outline-none
                    max-h-[300px]
                    "
                  />
                </Link>
                <div
                  className="absolute bottom-2 left-0 right-0 px-2 py-2 bg-gray-800 opacity-0 transition-opacity ease-in-out duration-100
                  group-hover:opacity-70
                  group-focus:opacity-70
                  w-[99%]
                  mx-auto
                  rounded-b-xl
                  flex flex-col
                "
                >
                  <h3 className="text-lg text-white">{plant.name}</h3>
                  <div className="text-sm text-white font-light">
                    <p>
                      {!plant.species2
                        ? plant.species
                        : plant.species + " / " + plant.species2}
                    </p>
                    <div className="flex flex-row gap-1">
                      <p>
                        {plant.plantHeight && "H: " + plant.plantHeight + " cm"}
                      </p>
                      <p>
                        {plant.plantWidth && "W: " + plant.plantWidth + " cm"}
                      </p>
                    </div>
                    {/* <p>{plant.plantWeight && plant.plantWeight}</p> */}
                  </div>
                </div>
              </div>
              <Link
                href={`/myplants/${plant.id}`}
                className="hover:underline hover:text-blue-400"
              >
                <div className="elipsis"> {plant.name} </div>
              </Link>
              <div className="font-light italic">
                {" "}
                {plant.species} {plant.species2 ? "x " + plant.species2 : null}{" "}
              </div>
              <p
                className="
                bg-yellow-100
                font-light
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
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="">
        <h1 className="text-3xl flex justify-center mt-4 items-center gap-1">
          My plants
          <RiPlantLine className="text-3xl text-green-400" />
        </h1>
        {showPlantsCard()}
        <div className="w-full flex justify-center m-4 mb-8">
          {
            <button
              onClick={() => setShowForm(true)}
              id="addPlantButton"
              className="bg-green-300 border-sky-300 rounded-md p-1 flex justify-center items-center gap-1 xs:text-2xl text-xl py-2 px-2 bg-opacity-90 hover:bg-opacity-810 hover:border-red-300 hover:text-[#ec9e69] ease-in-out duration-300
          hover:bg-[#fffbcc]
          "
            >
              Add a new plant <FaSeedling />
            </button>
          }
        </div>
      </div>
      <CSSTransition
        in={showForm}
        timeout={1000}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <div
          onClick={onSubmitFromParent}
          className="fixed top-0 h-[100vh] w-[100vw] bg-[rgb(0,0,0,.5)] z-40 right-0"
        ></div>
      </CSSTransition>

      <CSSTransition
        in={showForm}
        timeout={600}
        classNames="page"
        unmountOnExit
        mountOnEnter
      >
        <CreateUniquePlant
          userId={userId}
          data={plantSpecies}
          onSubmit={onSubmitFromParent}
          onClose={handleOnClose}
        />
      </CSSTransition>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const userId: string = (session.user as User).id;
  const username: string = (session.user as User).name;

  const items = await prisma.uniquePlant.findMany({
    where: {
      ownerId: String(userId),
    },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
    include: {
      ownedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  const plantSpecies = await prisma.uniquePlant.findMany({
    select: {
      species: true,
      species2: true,
    },
  });

  return {
    props: {
      session,
      userId,
      username,
      plantSpecies,
      items: JSON.parse(JSON.stringify(items)),
    },
  };
}
