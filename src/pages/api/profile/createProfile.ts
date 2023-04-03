import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";
const prisma = new PrismaClient();

export default async function createProfileAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const { user } = useUser();
  //   let userEmail: string = user?.email || "no email";
  //   let userNickname: string = user?.nickname || "no nickname";

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
