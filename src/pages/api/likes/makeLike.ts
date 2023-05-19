import { PrismaClient, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
interface error {
  message: string;
}
type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const commentData = JSON.parse(req.body);
  const { reference, refId, userId } = commentData;
  let type = "";
  let typeId = "";
  if (reference === "UniquePlant") {
    type = "plants";
    typeId = "plantId";
  } else if (reference === "Collection") {
    type = "collections";
    typeId = "collectionId";
  }
  try {
    const savedComment = await prisma.like.create({
      data: {
        User: { connect: { id: userId } },
        [type]: { connect: { id: refId } },
      },
    });
    await prisma.$disconnect();
    res.status(200).json(savedComment);
  } catch (error: any) {
    await prisma.$disconnect();
    console.log(error);
    res.status(500).json({ message: `${error.code}` });
  }
}
