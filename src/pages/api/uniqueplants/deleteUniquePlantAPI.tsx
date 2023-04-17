import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const uniquePlantData = JSON.parse(req.body);
  const uniquePlantId = uniquePlantData.uniquePlantId;
  const userId = uniquePlantData.userId;
  console.log({ uniquePlantId, userId });

  const uniquePlant = await prisma.uniquePlant.findUnique({
    where: {
      id: uniquePlantId,
    },
  });

  if (!uniquePlant) {
    res.status(404).json({ message: "Unique Plant not found" });
  }

  const ownerID = uniquePlant?.ownerId;

  if (ownerID !== userId) {
    res.status(403).json({ message: "Not authorized to delete this item" });
  } else {
    const deletedUniquePlant = await prisma.uniquePlant.delete({
      where: {
        id: uniquePlantId,
      },
    });
    res.status(200).json(deletedUniquePlant);
  }
}
