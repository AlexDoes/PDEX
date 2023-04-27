import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const profileData = JSON.parse(req.body);
  const userId = profileData.userId;
  const image = profileData.image;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(403).json({ message: "Unauthorized" });
  } else if (user.id !== userId) {
    res.status(403).json({ message: "Unauthorized" });
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: profileData.image,
    },
  });

  res.status(200).json(updatedUser);
}
