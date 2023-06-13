import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { visibility, collectionID, userId } = JSON.parse(req.body);

  const findCollection = await prisma.plantCollection.findUnique({
    where: { id: collectionID },
  });

  if (!findCollection) {
    return res.status(404).json({ message: "Collection not found" });
  }
  if (findCollection.ownerId !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const collection = await prisma.plantCollection.update({
    where: { id: collectionID },
    data: { public: visibility },
  });

  return res.status(200).json(collection);
}
