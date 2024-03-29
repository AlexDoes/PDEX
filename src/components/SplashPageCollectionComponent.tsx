import LoadingText from "./LoadinText";
import Link from "next/link";
import Footer from "./Footer";
import InfoModal from "./InfoModal";
import { FaSearch, FaSeedling } from "react-icons/fa";

type PlantContent = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  species: string;
  water: string | null;
  light: string | null;
  ownerId: string;
  species2: string | null;
  plantHeight: string | null;
  plantWidth: string | null;
  plantDepth: string | null;
  plantWeight: string | null;
};

type Collection = {
  id: string;
  name: string;
  ownerId: string;
  public: boolean;
  description: string | null;
  weight: number;
  plantContents: PlantContent[];
};

type Props = {
  collection: Collection;
};

const primary = "#c1e1c1";
const secondary = "#fffbcc";

export default function Splash(Data: Props) {
  const displayData = Data.collection;

  return (
    <>
      <div className="w-fullflex justify-center mt-[5%] sm:mt-2 ">
        <div className="flex lg:flex-row flex-col w-full gap-5">
          <div
            // id="leftSplash"
            className=" 
            font-serif
            lg:w-[80%]
            flex items-center justify-center lg:h-[80vh] xs:h-[60vh]
            flex-col"
          >
            <div
              // id="splashtextcontainer"
              className="flex rounded-3xl bg-opacity-[40%] w-[90%]
               min-h-[40vh] justify-center items-center
              lg:min-w-[350px]
              sm:min-w-[500px]  max-w-[500px]
              select-none
              backdrop-invert-[15%] g-[#9bab6e]
              backdrop-blur-[3px]
              lg:backdrop-blur-0
              lg:backdrop-invert-[10%]
              flex-col py-4
               "
            >
              <h1 className="text-6xl font-light text-[#cafbd7] w-90% borde">
                <div className="">
                  <LoadingText text="Introducing" />
                  <div className="flex-row flex text-sm font-light text-black my-3 gap-4 pl-1">
                    <Link href={"/explore"}>
                      <button
                        id="splashButton"
                        className={`bg-[${primary}] hover:text-[#c07a4b] flex items-center px-2 py-2 rounded-md ease-in-out duration-500 transition-all hover:bg-[${secondary}]`}
                      >
                        Explore collections
                        <FaSearch className="inline ml-1" />
                      </button>
                    </Link>
                    <Link href={"/c/KatiesCollection"}>
                      <button
                        id="splashButton"
                        className={`bg-[${primary}] hover:text-[#c07a4b] flex items-center p-2 py-2 rounded-md ease-in-out duration-500 transition-all hover:bg-[${secondary}]`}
                      >
                        Check out Katie's collection
                        <FaSeedling className="inline ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </h1>
            </div>
          </div>

          <div
            // id="rightSplash"
            className="w-full border-black  
            rounded-xl px-5 py-5"
          >
            {displayData.plantContents.map((plant, i) => {
              if (i > 6) {
                return null;
              }
              const reverse =
                i % 2 === 0
                  ? "flex-col-reverse sm:flex-row-reverse gradient-bg-card2"
                  : "gradient-bg-card2-reverse flex-col-reverse sm:flex-row";
              return (
                <div
                  key={plant.id}
                  className={`
                  bg-opacity-80
                  glass-background 
                  bg-card
                  ${reverse} 
                  flex flex-row 
                   border-[#C1E1C1]
                  rounded-xl 
                  sm:justify-between mb-2 
                  min-h-[200px] p-4 gap-4
                  overflow-auto
                  justify-center
                  items-center
                  max-w-[1000px]
                  `}
                >
                  <div
                    className="
                    flex
                    flex-col
                    min-h-[200px]
                    max-h-[200px]
                    gap-2
                    h-full
                    w-[80%]"
                  >
                    <div>
                      <p className=" font-light text-[20px] lg:text-[26px] text-black select-none transition-all ease-in-out duration-300  hover:text-[#5bd5f0]">
                        <Link href={`p/${plant.id}`}>{plant.name}</Link>
                      </p>
                      <p className="text-[#FFFDD0] italic select-none transition-all ease-in-out duration-300  hover:text-[#62d6f6] ">
                        <Link href={`search/${plant.species}`}>
                          {plant.species}
                        </Link>
                      </p>
                    </div>
                    <p
                      className="overflow-auto text-[12px] bg-[#FFF4BD] bg-opacity-50 pl-3 pr-3 pt-1 pb-2 rounded-md
                      scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
                      scrollbar-rounded-sm
                      h-full font-[400] font-inter
                    "
                      id="plantDescriptionText"
                    >
                      {plant.description}
                    </p>
                  </div>
                  <div className="w-[20%] min-w-[200px] min-h-[200px] flex justify-center items-center">
                    <Link href={`p/${plant.id}`}>
                      <img
                        src={plant.image}
                        width={200}
                        height={200}
                        className="w-[200px] h-[200px] rounded-lg select-none"
                        alt={plant.name}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <InfoModal />
    </>
  );
}
