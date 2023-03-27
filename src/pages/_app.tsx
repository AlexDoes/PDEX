import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <div className=" border border-green-900"> This is the App page </div> */}
      <img
        src="https://media.licdn.com/dms/image/C5603AQEaHa6F7FUg2A/profile-displayphoto-shrink_800_800/0/1655998047341?e=1685577600&v=beta&t=w20-CXm52ae2U8Q8hOkjdZAO705qv2BXHGKV1lwbIS8"
        // alt="Next.js logo"
        width={200}
        height={200}
        className="absolute right-0 z-10 transform -scale-x-100 hover:transform hover:scale-x-100 transition duration-500 ease-in-out"
      />
      <img
        src="/images/Splash1.png"
        alt="Next.js logo"
        className="h-[100%] w-[100vw] "
      />
      <UserProvider>
        <Component {...pageProps} className="border border-green-900" />
      </UserProvider>
      <div className="flex w-full gap-2">
        <button className="w-20 h-12 border-2 border-green-500">
          <a href="/api/auth/login">Login</a>
        </button>
        <button className="w-20 h-12 border-2 border-green-500">
          <a href="/api/auth/logout">Logout</a>
        </button>
      </div>
    </>
  );
}
