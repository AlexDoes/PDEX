import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function AuthButtonComponent() {
  const { data: session } = useSession();
  console.log(session);

  const [showmenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(!showmenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  if (session) {
    return (
      <>
        <div
          className="h-full w-full  px-2 md:px-4 xl:mr-3 "
          onClick={openMenu}
        >
          {/* {"Hello " + session.user.name?.split(" ")[0]} */}
          <div className="h-full w-full flex justify-center items-center cursor-pointer">
            <div>
              {!showmenu && <GiHamburgerMenu size={30} color="#efe6c1" />}
            </div>
            <div className="border border-[#efe6c1] rounded-md shadow-sm hover:shadow-md">
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
          timeout={400}
          classNames="dropdown"
          unmountOnExit
          onExited={closeMenu}
        >
          <div
            className="absolute top-16 w-full right-0 z-20 bg-[#c1e1c1] shadow-md text-green-400 rounded-b-md p-2 flex flex-col gap-3 "
            onClick={openMenu}
          >
            <div
              id="menu-items"
              className=" transition-all ease-in-out duration-500   md:ml-[4vw] "
            >
              <div
                className=""
                onClick={openMenu}
                // style={{ animationDelay: "5000ms" }}
              >
                <Link
                  className="sm:text-2xl text-lg text-[#efe6c1] text-shadow-md "
                  href={"/profile"}
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
              <div>
                <Link
                  className="sm:text-2xl text-[#efe6c1] text-shadow-md "
                  href={"/"}
                >
                  Liked Content
                </Link>{" "}
              </div>
              <div className="">
                <Link
                  className="sm:text-2xl text-[#efe6c1] text-shadow-md"
                  href={`/u/${session.user?.id}`}
                >
                  Public Profile
                </Link>{" "}
              </div>
              <div className="sm:text-2xl text-slate-500 text-shadow-md">
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
      <div className="relative group">
        <button
          onClick={() => signIn()}
          className="w-12 h-12 rounded-lg shadow-2xl text-[#33af9b] border-[#4bcdb7] border-2 flex items-center justify-center group hover:bg-[#4ed9c2] hover:text-[#2ca08d] transition-all ease-in-out duration-500 hover:bg-opacity-60"
        >
          <AccountCircleOutlinedIcon style={{ fontSize: "200%" }} />
        </button>
        <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-blue-400 animate-ping-short overflow-hidden group-hover:hidden "></div>
        <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-blue-400 "></div>
      </div>
    </>
  );
}
