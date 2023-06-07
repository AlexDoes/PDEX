import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { AiFillGithub } from "react-icons/ai";
import { FaAngellist } from "react-icons/fa";
import { GrGithub } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="w-[100vw] h-[150px] text-2xl  flex justify-center flex-col items-center absolute ">
      <h1 className="text-white">Social Links</h1>
      {/* Section */}
      <div className="flex flex-row justify-center items-center h-[60%] ">
        <div className="flex flex-row gap-2">
          <a href="">
            <CiLinkedin size={30} color="white" />
          </a>
          <a href="  "></a>
          <AiFillGithub size={30} color="white" />
          <a href=" ">
            <FaAngellist size={30} color="white" />
          </a>
        </div>

        {/* Section2 */}
        <div className="flex flex-row gap-2">
          <a href="">
            <CiLinkedin size={30} color="white" />
          </a>
          <a href=""></a>
          <AiFillGithub size={30} color="white" />
          <a href="">
            <FaAngellist size={30} color="white" />
          </a>
        </div>

        {/* <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit asperiores doloribus excepturi id reprehenderit deserunt explicabo aut! Recusandae totam, velit nihil in unde odio consequatur eos, facere qui, quia maiores?
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
