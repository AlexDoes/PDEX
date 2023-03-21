import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <div> This is the App page </div> */}
      <Component {...pageProps} />
    </>
  );
}

let age: number = 30;
let name: string = "tashi";
let trueorfalse: boolean = true;
