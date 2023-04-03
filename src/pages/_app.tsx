import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { Auth0Provider } from "@auth0/auth0-react";
const DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;
const CLIENT_ID = process.env.AUTH0_CLIENT_ID;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Auth0Provider
        domain={DOMAIN || ""}
        clientId={CLIENT_ID || ""}
        authorizationParams={{
          redirect_uri: "http://localhost:3000",
        }}
      >
        {/* <div className=" border border-green-900"> This is the App page </div> */}
        <NavBar />
        <Component {...pageProps} className="border border-green-900" />
      </Auth0Provider>
    </>
  );
}
