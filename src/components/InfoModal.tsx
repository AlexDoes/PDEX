import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineCloseCircle } from "react-icons/ai";
import LoadingPlantImage from "./LoadingPlant";

const InfoModal = () => {
  const [showModal, setShowModal] = useState(false);
  const transitionRef = useRef(null);
  const transitionRef2 = useRef(null);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleOutsideClick = (e: any) => {
    console.log("clicked");
    if (e.target.id === "modalbackdrop") {
      setShowModal(false);
    }
  };

  return (
    <div
      className={`fixed bottom-12 z-50 left-[4%] cursor-pointer 
    font-lato
    ${!showModal ? `animate-pulse-slow` : `animate-none`}
    `}
    >
      {!showModal && (
        <div onClick={handleModal}>
          <BsInfoCircle
            size={32}
            className="text-[#c1e1c1] hover:text-[#ebf6c4] transition duration-300 ease-in-out"
          />{" "}
        </div>
      )}

      <CSSTransition
        in={showModal}
        timeout={1000}
        classNames="fade"
        unmountOnExit
        mountOnEnter
        nodeRef={transitionRef}
      >
        <div
          ref={transitionRef}
          // onClick={handleAddCollectionClick}
          className="fixed z-30 top-0 right-0 left-0 bottom-0 h-[100vh] w-[100vw] bg-[rgb(0,0,0,.5)] backdrop-blur-sm "
        ></div>
      </CSSTransition>

      <CSSTransition
        in={showModal}
        timeout={1000}
        classNames="page"
        unmountOnExit
        mountOnEnter
        nodeRef={transitionRef2}
      >
        <div
          ref={transitionRef2}
          onClick={handleOutsideClick}
          id="modalbackdrop"
          className="fixed z-40 top-0 left-0 right-0 bottom-0 h-[100vh]  w-[100vw] flex justify-center items-center"
        >
          <div
            id="modalbg"
            className=" z-50 modalbg rounded-md md:w-[80%] w-[80%] h-[85%]   max-w-[900px] border-[#c1e1c1] p-2 flex flex-col py-5 items-center overflow-y-hidden auto bg-[#9bab6e] relative bg-opacity-90 cursor-auto select-none"
          >
            <div
              onClick={handleModal}
              className="absolute right-3 top-3 rounded-full cursor-pointer"
            >
              <AiOutlineCloseCircle
                size={24}
                className="text-white hover:text-gray-300 ease-in-out transition duration-3"
              />
            </div>
            <div className="w-[95%] h-full flex flex-col items-center text-center gap-1 text-xs sm:text-sm justify-center">
              <div className=" xl:mt-2 md:text-md lg:text-lg">
                <LoadingPlantImage />
              </div>
              <div
                className="text-3xl hover:text-green-100 ease-in-out   text-center items-center mb-1  text-[#fffbcc] 
              transition duration-300"
              >
                Welcome BAX
              </div>
              <div className="md:text-lg lg:text-lg w-[95%] text-[#097d81e7]">
                BAX is a small social media platform where plant lovers can
                showcase their plants by posting their plants and showcasing
                their currated collections as well as interact with other plant
                lovers collections and plants.
              </div>
              <div className="text-[#b4fcd8] font-light md:text-lg w-[90%]">
                "Inspired by my lovely partner's love for rare plants, I created
                BAX to showcase Katie's plants. As someone who is not a plant
                connoisseur, I wanted to create a platform where I can learn
                about plants everyone raised lovingly."
                <br />- Alex{" "}
              </div>
              <div className="md:text-lg w-[90%] text-[#5d47a5] font-light">
                "Alex dragged me here"
                <br />- Steven
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default InfoModal;
