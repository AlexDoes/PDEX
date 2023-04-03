import { useUser } from "@auth0/nextjs-auth0/client";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function checkIfProfileExistsAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = useUser();
  let userEmail: string = user?.email || "no email";

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userProfile = await prisma.user.findUniqueOrThrow({
    where: {
      email: userEmail,
    },
  });

  res.status(200).json(userProfile);
}
