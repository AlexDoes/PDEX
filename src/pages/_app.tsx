import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div> This is the App page </div>
      <img
        src="https://media.licdn.com/dms/image/C5603AQEaHa6F7FUg2A/profile-displayphoto-shrink_800_800/0/1655998047341?e=1685577600&v=beta&t=w20-CXm52ae2U8Q8hOkjdZAO705qv2BXHGKV1lwbIS8"
        // alt="Next.js logo"
        width={200}
        height={200}
      />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
