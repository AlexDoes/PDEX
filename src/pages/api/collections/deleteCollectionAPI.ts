import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const plantCollectionData = JSON.parse(req.body);
  const plantCollectionId = plantCollectionData.collectionId;
  const plantCollectionOwnerId = plantCollectionData.userId;

  const plantCollection = await prisma.plantCollection.findUnique({
    where: { id: String(plantCollectionId) },
  });

  if (!plantCollection) {
    return res.status(404).json({ message: "Plant collection not found" });
  }

  const ownerId = plantCollection?.ownerId;

  if (plantCollectionOwnerId !== ownerId) {
    return res.status(403).json({ message: "Not authorized" });
  } else {
    await prisma.plantCollection.delete({
      where: { id: String(plantCollectionId) },
    });
    res.status(200).json({ message: "Plant collection deleted" });
  }

  res.json(plantCollection);
}
