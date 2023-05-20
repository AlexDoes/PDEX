import { PrismaClient, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const commentData = JSON.parse(req.body);
  const deletingId = commentData.id;

  try {
    const deletedLike = await prisma.like.delete({
      where: {
        id: deletingId,
      },
    });
    await prisma.$disconnect();
    res.status(200).json(deletedLike);
  } catch (error: any) {
    await prisma.$disconnect();
    console.log(error);
    res.status(500).json({ message: `${error.code}` });
  }
}
