import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function AuthButtonComponent() {
  const { data: session } = useSession();
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
        <div className="h-full w-full" onClick={openMenu}>
          {/* {"Hello " + session.user.name?.split(" ")[0]} */}
          <div className="h-full w-full flex justify-center items-center border-4 cursor-pointer">
            <AccountCircleOutlinedIcon
            // style={{ fontSize: "100%", border: "2px solid black" }}
            />
          </div>
        </div>
        {showmenu && (
          <div id="dropdownmenu">
            <div
              className="absolute top-12 right-0 z-20 bg-white shadow-md text-green-400 rounded-md p-2"
              onClick={openMenu}
            >
              <div onClick={openMenu}>
                <Link className="w-full border-2" href={"/profile"}>
                  Profile
                </Link>{" "}
              </div>
              <div className="w-full">
                <Link className="w-full border-2" href={"/mycollections"}>
                  My collections
                </Link>{" "}
              </div>
              <div>
                <Link className="w-full border-2" href={"/myplants"}>
                  Personal plants
                </Link>{" "}
              </div>
              <div>
                <Link className="w-full border-2" href={"/"}>
                  Favorited Plants
                </Link>{" "}
              </div>
              <div>
                <Link className="w-full border-2" href={"/"}>
                  Settings
                </Link>{" "}
              </div>
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {/* Not signed in <br /> */}
      <button
        className="flex gap-1 text-blue-600 border-2 pt-1 pb-1 pr-2 pl-2 rounded-full"
        onClick={() => signIn()}
      >
        <AccountCircleOutlinedIcon />
        Sign in
      </button>{" "}
      <br />
    </>
  );
}
