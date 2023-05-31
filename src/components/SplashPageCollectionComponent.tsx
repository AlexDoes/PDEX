import Image from "next/image";
import bg1 from "public/BG/BG1-rahul-goyal-3m1Z2S96FuY-unsplash.jpg";
import bg2 from "public/BG/BG2-annie-spratt-9DedxUSwLg4-unsplash.jpg";
import bg3 from "public/BG/BG3-gryffyn-m-fNipzSgk6t4-unsplash.jpg";
import bg4 from "public/BG/BG4-annie-spratt-HB-Kf9WLy_0-unsplash.jpg";
import bg5 from "public/BG/BG5-evie-s-uuCjYxJVf4o-unsplash.jpg";
import bg6 from "public/BG/bg0526.png";
import LoadingText from "./LoadinText";

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

export default function Splash(Data: Props) {
  const displayData = Data.collection;

  return (
    <>
      <div className="w-full   h-[90vh] flex justify-center mt-[5%] sm:mt-2   ">
        <div className="flex xl:flex-row flex-col w-full gap-5">
          <div
            // id="leftSplash"
            className=" 
            font-serif
            lg:w-[80%]
            flex items-center justify-center h-[80vh]"
          >
            <div
              // id="splashtextcontainer"
              className="flex rounded-3xl bg-opacity-40 bg-yellow-200  w-[90%]
               h-[40vh] justify-center items-center
               overflow-hidden 
              sm:min-w-[500px]  max-w-[500px]
              select-none
               "
            >
              <h1 className="text-6xl text-black text-center">
                <div className="">
                  <LoadingText text="Introducing" />
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
                      <h3 className="text-[20px] lg:text-[26px] text-black select-none">
                        {plant.name}
                      </h3>
                      <p className="text-[#FFFDD0] italic select-none ">
                        {plant.species}
                      </p>
                    </div>
                    <p
                      className="overflow-auto text-[12px] bg-[#FFF4BD] bg-opacity-50 pl-3 pr-3 pt-2 pb-2 rounded-md
                      scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1]
                      scrollbar-rounded-sm
                      h-full
                    "
                      id="plantDescriptionText"
                    >
                      {plant.description}
                    </p>
                  </div>
                  <div className="w-[20%] min-w-[200px] min-h-[200px] flex justify-center items-center">
                    <img
                      src={plant.image}
                      width={200}
                      height={200}
                      className="w-[200px] h-[200px] rounded-lg select-none"
                      alt={plant.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
