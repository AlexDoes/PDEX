import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <div className=" border border-green-900"> This is the App page </div> */}
      <UserProvider>
        <NavBar />
        <Component {...pageProps} className="border border-green-900" />
      </UserProvider>
    </>
  );
}
