import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { AiFillGithub } from "react-icons/ai";
import { FaAngellist } from "react-icons/fa";
import { GrGithub } from "react-icons/gr";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const show = router.pathname !== "/auth/signin";
  return (
    <div className="w-[100vw] h-[150px] text-2xl md:gap-28 gap-4 flex justify-center flex-col md:flex-row items-center absolute ">
      {/* <h1 className="text-white">Social Links</h1> */}
      <div className=" text-lg text-white">
        <div className="flex flex-row  gap-2  md:flex-col">
          <Link className=" underline" href={"/"}>
            Home
          </Link>
          <Link className=" underline" href={"/explore"}>
            Explore
          </Link>
          <Link className=" underline" href={"/"}></Link>
        </div>
      </div>
      {/* Social Links*/}
      <div className="flex flex-col justify-center items-start h-[60%] ">
        <div className="flex flex-row gap-2 text-lg text-white justify-center items-center">
          Alex Wong:
          <a className=" underline" href="">
            Linkedin
          </a>
          <a className=" underline" href="  ">
            {" "}
            Github
          </a>
          <a className=" underline" href=" ">
            Portfolio
          </a>
          <a className=" underline" href=" ">
            WellFound
          </a>
        </div>

        <div className="flex flex-row gap-2 text-lg text-white justify-center items-center">
          Steven Sookhai:
          <a className=" underline" href="">
            Linkedin
          </a>
          <a className=" underline" href="  ">
            {" "}
            Github
          </a>
          <a className=" underline" href=" "></a>
            Portfolio
          </a>
          <a className=" underline" href=" ">
            WellFound
          </a>
        </div>
      </div>

      {/* <div className="text-white">Contact Us</div> */}
    </div>
  );
};

export default Footer;
