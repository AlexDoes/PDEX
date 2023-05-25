import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const collectionData = JSON.parse(req.body);
  const { description, collectionId, userId } = collectionData;

  try {
    const updatedCollection = await prisma.plantCollection.updateMany({
      where: {
        id: collectionId,
        ownerId: userId,
      },
      data: {
        description: description,
      },
    });
    if (updatedCollection.count === 0) {
      res.status(404).json({ message: "No collection with that id" });
    }
    return res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error });
  }
}
