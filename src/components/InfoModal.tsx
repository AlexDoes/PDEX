import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineCloseCircle } from "react-icons/ai";

const InfoModal = () => {
  const [showModal, setShowModal] = useState(false);
  const transitionRef = useRef(null);
  const transitionRef2 = useRef(null);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className=" fixed bottom-5 z-50 left-[4%]  cursor-pointer">
      {!showModal && (
        <div onClick={handleModal}>
          {" "}
          <AiOutlineInfoCircle size={45} color="white" />{" "}
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
          className="fixed z-50 top-0 right-0 left-0 bottom-0 h-[100vh] w-[100vw] bg-[rgb(0,0,0,.5)] "
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
          className="fixed z-50  top-7 left-0 right-0 bottom-0 h-[100vh]  w-[100vw] flex justify-center items-center  "
        >
          {/* <div className=" absolute w-[100vw] h-[100vh] bg-red-500 "></div> */}
          <div
            id="createuniqueplantform"
            className="gradient-bg-card2-reverse rounded-md md:w-[80%] w-[80%] h-[90%]   max-w-[1200px] border-[#c1e1c1] p-2 flex flex-col lg:flex-row lg:justify-center gap-10 py-5 items-center overflow-y-auto "
          >
            <div
              onClick={handleModal}
              className="absolute right-2 top-2 shadow-md rounded-full cursor-pointer"
            >
              <AiOutlineCloseCircle size={30} color="#C0C2C9" />
            </div>
            <div className="sm:w-[400px] w-[300px] lg:h-[90%] h-[500px] min-h-[500px] flex flex-col justify-center gap-3 ">
              <img className="border border-black h-full rounded-md" src="" alt="" />
              <div className="w-full justify-center flex ">
                <h1 className="text-white text-2xl">Alex Wong</h1>
              </div>
            </div>
            <div className="sm:w-[400px] w-[300px] lg:h-[90%] h-[500px] min-h-[500px] flex flex-col justify-center gap-3  ">
              <img className="border border-black h-full rounded-md" src="" alt="" />
              <div className="w-full justify-center flex ">
                <h1 className="text-white text-2xl">Steven Sookhai</h1>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default InfoModal;
