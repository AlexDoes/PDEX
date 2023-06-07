import React from "react";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

interface collection {
  id: string;
  name: string;
  description: string;
  plantContents: any;
  ownerId: string;
}

const ExploreCollectionCard = ({ collection }: any) => {
  console.log(collection);
  const [isFlipped, setIsFlipped] = useState(false);
  const randomIndex = Math.floor(
    Math.random() * collection.plantContents?.length
  );
  const randomPlantImage = collection?.plantContents[randomIndex]?.image;
  console.log(randomPlantImage);
  const handleClick = () => {
    console.log("clicked");
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-[300px] max-h-[400px] h-[400px] rounded-lg relative ">
      <CSSTransition
        in={isFlipped}
        timeout={700}
        classNames="flip"
      >
        <div className="relative w-full h-full">
          {!isFlipped && (
            <div className="absolute w-full h-full bg-black rounded-lg">
              <div className="p-4 border h-full w-full flex flex-col ">
                <div className=" min-h-[250px] w-inherit min-w-full max-h-[250px] w-full">
                  <img
                    className="border border-red-500 max-h-[250px] h-full w-full object-cover rounded-lg"
                    src={randomPlantImage}
                    alt=""
                  />
                </div>
                <h2 className="text-white text-lg">By: {collection.name}</h2>
                <p className="text-white overflow-auto min-h-[80px]">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolores tempora nam ducimus repudiandae suscipit iure vero
                  ratione distinctio aliquam a laboriosam consequatur, iste
                  consequuntur nesciunt ab accusamus ipsam corrupti vel?
                </p>
              </div>
            </div>
          )}
          {isFlipped && (
            <div className="absolute w-full h-full  bg-blue-500 rounded-lg">
              <div className="p-4">
                <h2 className="text-white text-lg">Back Side</h2>
                <p className="text-white">This is the back of the card.</p>
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
      <button className="  h-[50px] w-[50px] bg-red-200" onClick={handleClick}>
        Flip
      </button>
    </div>
  );
};

export default ExploreCollectionCard;
