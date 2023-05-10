import { toTitleCase } from "lib/generalFunctions";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import AuthButtonComponent from "@/components/AuthButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/router";
import NavBarSearchBar from "./NavBarSearchbarPrefetch";

export default function NavBar() {
  const router = useRouter();
  const show = router.pathname !== "/auth/signin";
  // Home
  // Sign in / Sign out
  // Collections
  // profile
  // About
  return (
    <>
      {show && (
        <div
          className="flex w-full gap-2 h-16 bg-[#c1e1c1] max-h-16 justify-between 
          "
        >
          <Link href={"/"} className="inherit">
            <div className="flex flex-row h-full  items-center lg:ml-[150px] transition-all ease-in-out duration-500">
              <img
                src="/logotransparent.png"
                alt="My Image"
                className="h-full"
              />
              <div className="text-[50px] font-serif text-[#efe6c1] text-shadow-md">
                BAX
              </div>
            </div>
          </Link>
          <div className="">
            <NavBarSearchBar />
          </div>
          {/* <button onClick={() => signOut()}>Sign out</button> */}
          <div className="flex w-[10%] items-center justify-center h-[100%]  lg:mr-[150px] transition-all ease-in-out duration-500">
            <AuthButtonComponent />
          </div>
        </div>
      )}
    </>
  );
}
