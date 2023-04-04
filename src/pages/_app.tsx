import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import AuthButtonComponent from "@/components/LoginButton";
import NavBar from "@/components/NavBar";

const DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;
const CLIENT_ID = process.env.AUTH0_CLIENT_ID;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <NavBar />
        {/* <AuthButtonComponent /> */}
        <Component {...pageProps} className="border border-green-900" />
      </SessionProvider>
    </>
  );
}
