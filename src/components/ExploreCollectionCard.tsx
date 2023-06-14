import React from "react";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { BsPhoneFlip } from "react-icons/bs";

interface collection {
  id: string;
  name: string;
  description: string;
  plantContents: any;
  ownerId: string;
  owner: string[];
}

const ExploreCollectionCard = ({ collection }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [randomPlantImage, setRandomPlantImage] = useState("");

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * collection.plantContents?.length
    );
    const randomPlantImage = collection?.plantContents[randomIndex]?.image;
    setRandomPlantImage(randomPlantImage);
  }, []);

  return (
    <div className="w-[300px] max-h-[400px] h-[400px] rounded-lg relative shadow-xl transition-all duration-400 ease-in-out hover:-translate-y-2 ">
      <div className="group [perspective:1000px] h-full w-full">
        <div
          className={`relative h-full w-full rounded-xl bg-opacity-80 bg-green-400 shadow-xl transition-all  duration-500 [transform-style:preserve-3d] ${
            isFlipped ? " [transform:rotateY(180deg)]" : ""
          }`}
        >
          <div
            className={`absolute top-2 ${
              isFlipped ? "left-2" : "right-2"
            }  z-10 cursor-pointer transition-all duration-100 ease-out`}
          >
            <BsPhoneFlip onClick={handleClick} size={30} color="white" />
          </div>
          <div className="absolute inset-0 h-full w-full hover:shadow-green-200  ">
            <div className="p-4  h-full w-full flex flex-col ">
              <div className=" min-h-[250px] w-inherit min-w-full max-h-[250px] w-full">
                <img
                  className=" max-h-[250px] h-full w-full object-cover rounded-lg"
                  src={randomPlantImage ? randomPlantImage : "/BG/greenbg2.png"}
                  alt=""
                />
              </div>
              <h2 className="text-white text-lg font-semibold">
                By:{" "}
                {collection.owner.nickname
                  ? collection.owner.nickname
                  : "A Plant Lover"}
              </h2>
              <p className="text-white overflow-auto min-h-[80px] ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolores tempora nam ducimus repudiandae suscipit iure vero
                ratione distinctio aliquam a laboriosam consequatur, iste
                consequuntur nesciunt ab accusamus ipsam corrupti vel?
              </p>
            </div>
          </div>
          <div className="absolute inset-0 h-full  overflow-y-auto  border rounded-xl bg-green-300  px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className=" h-full w-full flex rounded-lg flex-col  ">
              <h2 className="text-white text-4xl  text-center mb-2">Plants</h2>
              <div className=" w-full ">
                <ul>
                  {collection.plantContents.map((plant: any) => (
                    <li
                      key={collection.id + collection.owner.id}
                      className="flex flex-col w-full  text-center text-2xl truncate"
                    >
                      <p className="text-white">{plant.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCollectionCard;
