import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import prisma from "lib/prisma";
import Splash from "@/components/SplashPageCollectionComponent";

const inter = Inter({ subsets: ["latin"] });
interface Props {
  collection: any;
}

export default function Home(props: Props) {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>BAX</title>
        <meta name="description" content="BAX plant based social media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/baxlogo.png" />
      </Head>
      <Splash collection={props.collection} />
    </>
  );
}

export async function getStaticProps() {
  const collection = await prisma.plantCollection.findUnique({
    where: {
      id: "KatiesCollection",
    },
    include: {
      plantContents: {
        orderBy: {
          updatedAt: "asc",
        },
      },
    },
  });

  return {
    props: {
      collection: JSON.parse(JSON.stringify(collection)),
    },
  };
}
