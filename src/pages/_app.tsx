import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { Inter, Lato } from "@next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PlantDex</title>
        <meta name="description" content="PlantDex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <ToastContainer />
      <SessionProvider session={pageProps.session}>
        <NavBar />
        <Component {...pageProps} className="border border-green-900" />
      </SessionProvider>
    </>
  );
}
