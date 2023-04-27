import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

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
  const userInfo = profileData.userInfo;
  const data = profileData.data;
  console.log(userInfo.field);

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

  if (field === "nickname") {
    const adjustName = data.toLowerCase();
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          nickname: data,
          username: adjustName,
        },
      });
      prisma.$disconnect();
      res.status(200).json(updatedUser);
    } catch (error: any) {
      console.log(error);
      if (error.code === "P2002") {
        prisma.$disconnect();
        res.status(500).json({ message: "The username is already taken." });
      }
      prisma.$disconnect();
      res.status(500).json({ message: "Unknown error" });
    }
  } else {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        [field]: data,
      },
    });
    prisma.$disconnect();
    res.status(200).json(updatedUser);
  }
}
