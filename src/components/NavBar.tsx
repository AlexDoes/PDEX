import { toTitleCase } from "generalFunctions";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import AuthButtonComponent from "@/components/AuthButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/router";

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
        <div className="flex w-full gap-2 h-16 bg-purple-400 max-h-16 overflow-hidden justify-between ">
          <Link href={"/"} className="inherit">
            <div className="flex flex-row h-full items-center">
              <img
                src="/logotransparent.png"
                alt="My Image"
                className="h-full"
              />
              <div className="text-[50px] font-serif text-emerald-600">
                Plantdex
              </div>
            </div>
          </Link>
          {/* <button onClick={() => signOut()}>Sign out</button> */}
          <div className="flex w-[10%] items-center justify-center h-[100%]">
            <AuthButtonComponent />
          </div>
        </div>
      )}
    </>
  );
}
