import "@/styles/globals.css";
import "@/styles/carousel.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { Inter, Lato } from "@next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScreenChecker from "@/components/ScreenChecker";
// import DontLookHere from "@/pages/DontLookHere";

const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TASHI IN DEV</title>
        <meta name="description" content="PlantDex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <ToastContainer />
      <SessionProvider session={pageProps.session}>
        <NavBar />
        <div className="" id="center">
          <div className="w-[90%] xs:w-[100%] sm:w-[100%] md:w-[90%] xs:px-3 md:px-0">
            <Component {...pageProps} />
          </div>
        </div>
        <ScreenChecker />
      </SessionProvider>
    </>
  );
}
