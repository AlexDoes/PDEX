import { toTitleCase } from "lib/generalFunctions";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import AuthButtonComponent from "@/components/AuthButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/router";
import NavBarSearchBar from "./NavBarSearchbarPrefetch";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const show = router.pathname !== "/auth/signin";
  const [isBlur, setIsBlur] = useState(false);

  const handleBlur = () => {
    setIsBlur(true);
  };

  const closeBlur = () => {
    setIsBlur(false);
  };

  // Home
  // Sign in / Sign out
  // Collections
  // profile
  // About
  return (
    <>
      {show && (
        <div
          className={`flex w-full gap-2 h-16 max-h-16 justify-between sm:justify-between
          select-none font-inter font-light
          ${
            isBlur ? `bg-opacity-30 bg-black` : ""
          } ease-in-out transition-colors duration-300`}
        >
          <Link href={"/"} className="inherit">
            <div className="flex flex-row h-full md:ml-[4vw] items-center  transition-all ease-in-out duration-500">
              <img src="/baxlogo.png" alt="My Image" className="h-[75%]" />
              <div className="sm:text-[50px] text-3xl font-playfair text-[#efe6c1] text-shadow-md">
                BAX
              </div>
            </div>
          </Link>
          <div className=" md:mr-[4vw]  ">
            <NavBarSearchBar />
          </div>
          {/* <button onClick={() => signOut()}>Sign out</button> */}
          <div className="flex items-center justify-center h-[100%] md:mr-[3vw] transition-all ease-in-out duration-500">
            <AuthButtonComponent setBlur={handleBlur} closeBlur={closeBlur} />
          </div>
        </div>
      )}
    </>
  );
}
