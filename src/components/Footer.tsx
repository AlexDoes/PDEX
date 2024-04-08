import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { AiFillGithub } from "react-icons/ai";
import { FaAngellist } from "react-icons/fa";
import { GrGithub } from "react-icons/gr";
import { useRouter } from "next/router";
import Link from "next/link";
import InfoModal from "./InfoModal";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { AiOutlineCloseCircle } from "react-icons/ai";
import LoadingPlantImage from "./LoadingPlant";

const Footer = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const show = router.pathname !== "/auth/signin";
  const transitionRef = useRef(null);
  const transitionRef2 = useRef(null);

  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleOutsideClick = (e: any) => {
    if (e.target.id === "modalbackdrop") {
      setShowModal(false);
    }
  };

  if (!show) {
    return <></>;
  }

  return (
    <>
      <div
        className="
        border-t-2 border-[#efe6c1]
        w-[100vw] h-[100px] xs:text-2xl xsss:text-xl 
        md:gap-28 gap-4 flex backdrop-blur-[3px] justify-center text-shadow-lg flex-wrap items-center p-6
       "
      >
        {/* <h1 className="text-white">Social Links</h1> */}
        <div className=" xs:text-lg xsss:text-sm text-[#efe6c1] ">
          <div className="flex flex-wrap gap-1 text-shadow-lg justify-center md:flex-row">
            <Link
              className=" hover:underline text-shadow-md   hover:text-[#62d6f6] "
              href={"/"}
            >
              Home
            </Link>
            |
            <Link
              className=" hover:underline  hover:text-[#62d6f6] "
              href={"/explore"}
            >
              Explore
            </Link>
            |
            <div
              className=" hover:underline hover:text-[#62d6f6] relative cursor-pointer"
              onClick={() => setShowModal(!showModal)}
            >
              About
            </div>
            |
            <Link
              className=" hover:underline hover:text-[#62d6f6] "
              href={"/c/KatiesCollection"}
            >
              Katie's Collection |
            </Link>
            <Link className=" underline" href={"/"}></Link>
            <div className="flex flex-row gap-1 xs:text-lg   justify-center items-center">
              Alex Wong:
              <a
                className="hover:underline hover:text-[#62d6f6] "
                href="https://www.linkedin.com/in/alwong191/"
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
              <a
                className=" hover:underline   hover:text-[#62d6f6] "
                href="https://github.com/AlexDoes  "
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Github
              </a>
              <a
                className="hover:underline hover:text-[#62d6f6] "
                href="https://alexswe.com/ "
                target="_blank"
                rel="noreferrer"
              >
                Portfolio |{" "}
              </a>
              {/* <a
              className="hover:underline hover:text-[#62d6f6] "
              href=" https://wellfound.com/u/awong191"
            >
              WellFound
            </a> */}
            </div>
            <div className="flex flex-row gap-2 xs:text-lg   justify-center items-center">
              Steven Sookhai:
              <a
                className="hover:underline hover:text-[#62d6f6] "
                href="https://www.linkedin.com/in/steven-sookhai-37192a22a/"
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
              <a
                className="hover:underline hover:text-[#62d6f6] "
                href="https://github.com/StevenSookhai"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Github
              </a>
              <a
                className="hover:underline hover:text-[#62d6f6] "
                href="https://www.stevensookhai.com/"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
              {/* <a
              className="hover:underline hover:text-[#62d6f6] "
              href=" https://wellfound.com/u/steven-sookhai"
            >
              WellFound
            </a> */}
              |
            </div>
            <div className="flex flex-row gap-2 xs:text-lg   justify-center items-center">
              <a
                className="hover:underline hover:text-[#62d6f6] "
                href="mailto:contact@BaxReport@Gmail.com?subject=BAX&body=I%20would%20like%20to%20get%20in%20touch%20with%20you."
              >
                Contact Us
              </a>
              |
              <a
                className="hover:underline hover:text-[#62d6f6] "
                href="mailto:BaxReport@Gmail.comsubject=BAX&body=I%20would%20like%20to%20report%20a%20bug%20or%20problem."
              >
                Report a Bug
              </a>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Footer;
