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
import InfoModal from "@/components/InfoModal";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BAX</title>
        <meta name="description" content="BAX plant based social media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/baxlogo.png" />
      </Head>
      <NextNProgress color="#A3EBB1" />
      <ToastContainer />
      <SessionProvider session={pageProps.session}>
        <div className="min-h-[100vh] border-yellow-300 flex flex-col">
          <NavBar />
          <div className="font-lato flex-grow" id="center">
            <div className="w-[100%] xs:w-[100%] sm:w-[100%] md:w-[90%] xs:px-3 md:px-0">
              <Component {...pageProps} />
            </div>
          </div>
          {/* <ScreenChecker /> */}
          <div className="flex-shrink-0">
            <Footer />
          </div>
        </div>
      </SessionProvider>
      <Analytics />
    </>
  );
}
