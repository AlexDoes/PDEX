import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const usersCollection = await prisma.plantCollection.findMany({
    where: {
      ownerId: req.body.ownerId,
    },
  });

  const plantCollectionData = JSON.parse(req.body);
  const savedPlantCollection = await prisma.plantCollection.create({
    data: plantCollectionData,
  });
  //   res.status(200).json(usersCollection);
  res.status(200).json(savedPlantCollection);
}
