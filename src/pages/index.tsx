import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>TASHI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div>
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
      </div>
    </>
  );
}
