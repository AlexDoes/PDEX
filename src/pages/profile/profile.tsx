import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  address: string;
}

interface userInfo {
  [key: string]: string;
}

export default async function ProfileDashboard() {
  return <h1>yes</h1>;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }
  const userId = (session.user as User).id;
  const userInfo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return {
    // props: {
    //   userId,
    //   userInfo,
    // },
  };
}
