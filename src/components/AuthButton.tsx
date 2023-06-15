import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRef } from "react";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
  nickname: string;
  description: string | null | undefined;
}

export default function AuthButtonComponent({ setBlur, closeBlur }: any) {
  const { data: session } = useSession();
  const tansitionRef = useRef(null);
  const [showmenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(!showmenu);
    setBlur();
  };

  const closeMenu = () => {
    setShowMenu(false);
    closeBlur();
  };

  if (session) {
    return (
      <>
        <div className="h-full w-full  px-2 md:px-4 xl:mr-3" onClick={openMenu}>
          {/* {"Hello " + session.user.name?.split(" ")[0]} */}
          <div className="h-full w-full flex justify-center items-center cursor-pointer">
            <div className="">
              {!showmenu && <GiHamburgerMenu size={30} color="#efe6c1" />}
            </div>
            <div
              onClick={closeBlur}
              className="border border-[#efe6c1] rounded-md shadow-sm hover:shadow-md"
            >
              {showmenu && <AiOutlineClose size={30} color="#efe6c1" />}
            </div>
            {/* <div className={`${!showmenu ? "opacity-100 visible" : "opacity-0 invisible"}`}>
             <GiHamburgerMenu size={30} color="" /> 
            </div>
            <div className={`${!showmenu ? "opacity-0 invisible -z-[10]" : "opacity-100 visible"}`}>
             <AiOutlineClose size={30} color="" /> 
            </div> */}
          </div>
        </div>
        {showmenu && (
          <div
            onClick={closeMenu}
            className="fixed top-60 w-full h-full bg-none right-0 z-20 "
          ></div>
        )}
        <CSSTransition
          in={showmenu}
          timeout={200}
          classNames="dropdown"
          unmountOnExit
          onExited={closeMenu}
          nodeRef={tansitionRef}
        >
          <div
            ref={tansitionRef}
            className={`absolute top-16 w-[100vw] 
            right-0 z-20 shadow-md text-green-400 rounded-b-md p-2 flex flex-col gap-3
            bg-black indent-3 md:indent-3
            bg-opacity-30 backdrop-filter backdrop-blur-[2px] backdrop-brightness-100
            `}
            onClick={openMenu}
            id="hamburger-menu"
          >
            <div
              id="menu-items"
              className=" transition-all ease-in-out duration-500 md:ml-[4vw]"
            >
              <div
                className=""
                onClick={openMenu}
                // style={{ animationDelay: "5000ms" }}
              >
                <Link
                  className="sm:text-2xl text-lg text-[#efe6c1] text-shadow-md "
                  href={`/u/${(session.user as User).id}`}
                >
                  Profile
                </Link>{" "}
              </div>
              <div className="w-full">
                <Link
                  className="sm:text-2xl text-[#efe6c1] text-shadow-md"
                  href={"/mycollections"}
                >
                  Personal collections
                </Link>{" "}
              </div>
              <div>
                <Link
                  className="sm:text-2xl text-[#efe6c1] text-shadow-md"
                  href={"/myplants"}
                >
                  Personal plants
                </Link>{" "}
              </div>
              <div className="">
                <Link
                  className="sm:text-2xl text-[#efe6c1] text-shadow-md"
                  href={"/profile"}
                >
                  Profile Dashboard
                </Link>{" "}
              </div>
              <div>
                <Link
                  className="sm:text-2xl text-[#efe6c1] text-shadow-md"
                  href={"/explore"}
                >
                  Explore Collections
                </Link>{" "}
              </div>
              <div className="sm:text-2xl text-red-300 text-shadow-md">
                <button onClick={() => signOut()}>Sign out</button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
      {/* <button
        className="flex gap-1 text-blue-600 border-2 pt-1 pb-1 pr-2 pl-2 rounded-full"
        onClick={() => signIn()}
      >
        <AccountCircleOutlinedIcon />
      </button> */}
      <div className="group">
        <button
          onClick={() => signIn()}
          className="w-10 lg:mr-11 md:mr-6 sm:mr-3 xs:mr-2 h-10 relative rounded-lg shadow-2xl text-[#33af9b] border-[#4bcdb7] border flex items-center justify-center group hover:bg-[#4ed9c2] hover:text-[#2ca08d] transition-all ease-in-out duration-500 hover:bg-opacity-60"
        >
          <AccountCircleOutlinedIcon style={{ fontSize: "200%" }} />
          <div className="absolute top-0 right-0 -mr-1.5 -mt-1.5 w-3 h-3 rounded-full bg-blue-400 animate-ping-short overflow-hidden group-hover:hidden "></div>
          <div className="absolute top-0 right-0 -mr-1.5 -mt-1.5 w-3 h-3 rounded-full bg-blue-400 "></div>
        </button>
      </div>
    </>
  );
}
