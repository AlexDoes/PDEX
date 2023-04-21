import { PrismaClient } from "@prisma/client";
import { profile } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const profileData = JSON.parse(req.body);
  const userId = profileData.userId;
  const field = profileData.field;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  userId !== user?.id  {
    res.status(403).json({ message: "Unauthorized" });
  }

  const updatedUser = await prisma.user.update({
    where: {
        id: userId,
    },
    data: {
        field: field,
    }

  res.status(200).json(profileData);
}
