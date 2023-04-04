import { toTitleCase } from "generalFunctions";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import AuthButtonComponent from "@/components/LoginButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function NavBar() {
  // Home
  // Sign in / Sign out
  // Collections
  // profile
  // About'
  return (
    <>
      <div className="flex w-full gap-2 h-16 bg-purple-400 max-h-16 overflow-hidden justify-between ">
        <Link href={"/"} className="inherit">
          <div className="flex flex-row h-full items-center">
            <img src="/logotransparent.png" alt="My Image" className="h-full" />
            <div className="text-[50px] font-serif text-emerald-600">
              Plantdex
            </div>
          </div>
        </Link>
        <div className="flex w-[10%] items-center justify-center border-2">
          <AuthButtonComponent />
        </div>
      </div>
    </>
  );
}
