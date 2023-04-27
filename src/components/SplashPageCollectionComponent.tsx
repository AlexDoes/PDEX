import Image from "next/image";
import bg1 from "public/BG/BG1-rahul-goyal-3m1Z2S96FuY-unsplash.jpg";
import bg2 from "public/BG/BG2-annie-spratt-9DedxUSwLg4-unsplash.jpg";
import bg3 from "public/BG/BG3-gryffyn-m-fNipzSgk6t4-unsplash.jpg";
import bg4 from "public/BG/BG4-annie-spratt-HB-Kf9WLy_0-unsplash.jpg";
import bg5 from "public/BG/BG5-evie-s-uuCjYxJVf4o-unsplash.jpg";

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
      <div className="border-8 w-full">
        <div className="border-2 flex flex-row w-full">
          <div
            id="leftSplash"
            className="w-[45%] border-2 border-green-700"
            // make this background image take up the height of the container

            style={{
              backgroundImage: `url(${bg3.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              // backgroundPosition: "center",
              border: "2px solid black",
            }}
          >
            <p> content</p>
          </div>
          <div
            id="rightSplash"
            className="w-[55%] border-2 border-black rounded-xl px-5 py-5 overflow-auto"
          >
            {displayData.plantContents.map((plant, i) => {
              const reverse = i % 2 === 0 ? "flex-row-reverse" : null;
              return (
                <div
                  key={plant.id}
                  className={`glass-background 
                  ${reverse} 
                  flex flex-row 
                  border-2 border-black
                  rounded-lg 
                  justify-between mb-2 
                  min-h-[200px] p-4 gap-4
                  overflow-auto
                  `}
                >
                  <div
                    className="
                    outline outline-4 outline-red-400
                    flex
                    flex-col
                    justify-center
                    w-[80%]"
                  >
                    <h3 className="text-[20px]">{plant.name}</h3>
                    <p>Species {plant.species}</p>
                    <p className="overflow-auto h-[60%] bg-[#FFF4BD]">
                      {plant.description}
                    </p>
                  </div>
                  <div className="w-[20%] min-w-[200px] min-h-[200px] flex justify-center items-center">
                    <Image
                      src={plant.image}
                      width={200}
                      height={200}
                      className="w-[200px] h-[200px] rounded-lg"
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
