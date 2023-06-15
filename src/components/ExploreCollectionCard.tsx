import React from "react";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { BsPhoneFlip } from "react-icons/bs";
import Link from "next/link";

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
    <div className="w-[300px] max-h-[500px] h-[462px] rounded-lg relative shadow-xl transition-all duration-400 ease-in-out ">
      <div className="group [perspective:1000px] h-full w-full">
        <div
          className={`relative h-full w-full rounded-xl bg-opacity-80 bg-gradient-to-br from-[#c5fec3] to-[#eaeac7] transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped ? " [transform:rotateY(180deg)]" : ""
          }`}
        >
          <div
            className={`absolute top-2 ${
              isFlipped ? "left-2" : "right-2"
            }  z-10 cursor-pointer transition-all duration-100 ease-out backdrop-invert-[20%] backdrop-blur-[0px] bg-black bg-opacity-30 [transform:rotateY(180deg) rounded-md overflow-hidden`}
          >
            <BsPhoneFlip onClick={handleClick} size={30} color="beige" />
          </div>
          {/* /// FRONT ///////////////////////////////////////////////// */}

          <div
            className={`absolute inset-0 h-full w-full hover:shadow-green-200 ${
              isFlipped ? `opacity-0` : ""
            } `}
          >
            <div className="p-4  h-full w-full flex flex-col gap-1 ">
              <div className=" min-h-[250px] w-inherit min-w-full max-h-[250px] w-full">
                <Link href={`/c/${collection.id}`}>
                  <img
                    className=" max-h-[250px] h-full w-full object-cover rounded-lg"
                    src={
                      randomPlantImage ? randomPlantImage : "/BG/greenbg2.png"
                    }
                    alt="collection image"
                  />
                </Link>
              </div>
              <div className="text-[#0a494375] text-xl flex flex-col">
                <Link
                  href={`/c/${collection.id}`}
                  className="hover:text-[#7788f7] transition-all duration-200 ease-in-out"
                >
                  <div className="">{collection.name}</div>
                </Link>
                <h2 className="text-[#ed9595ed] text-lg font-light italic">
                  By{" "}
                  {collection.owner.nickname ? (
                    <Link
                      className="hover:text-[#7788f7] transition-all duration-200 ease-in-out"
                      href={`/u/${
                        collection.owner.nickname || collection.owner.id
                      }`}
                    >
                      {collection.owner.nickname
                        ? collection.owner.nickname
                        : "A Plant Lover"}
                    </Link>
                  ) : (
                    "A Plant Lover"
                  )}
                </h2>
              </div>
              <div className="text-black font-light backdrop-blur-md h-full bg-opacity-30 bg-[#e4fde9] rounded-l-lg px-1 overflow-auto min-h-[80px] scrollbar-thin scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1] scrollbar-rounded-sm ">
                {collection.description
                  ? collection.description
                  : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores tempora nam ducimus repudiandae suscipit iure vero ratione distinctio aliquam a laboriosam consequatur, iste consequuntur nesciunt ab accusamus ipsam corrupti vel?"}
              </div>
            </div>
          </div>

          {/* /// BACK ///////////////////////////////////////////////// */}

          <div className="absolute inset-0 h-full bg-opacity-50 rounded-xl border-[#c1e1c1] bg-gradient-to-br from-[#c5fec3] tto-[#eaeac7] p-2 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]  overflow-y-auto scrollbar-none scrollbar-track-[#FFF4BD] scrollbar-thumb-[#C1E1C1] scrollbar-rounded-sm">
            <div className=" h-full w-full flex rounded-lg flex-col ">
              <div className="text-[#47c35e] text-2xl text-center font border-b w-full border-white top-0">
                Plants
              </div>
              <div className=" w-full">
                <ul className="w-full">
                  {collection.plantContents.map((plant: any, i: number) => (
                    <li
                      key={collection.id + collection.owner.id + i}
                      className="text-[#0a494375] flex flex-col w-full font-light text-center text-xl truncate"
                    >
                      <Link href={`/p/${plant.id}`} className="">
                        <p className="hover:text-[#7788f7] transition-all duration-200 ease-in-out">
                          {plant.name}
                        </p>
                      </Link>
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
