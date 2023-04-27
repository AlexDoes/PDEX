import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const data = JSON.parse(req.body);
  const userId = data.userId;
  console.log(data);
  const collectionId = data.collectionId;
  const plantId = data.uniquePlantId;

  const collection = await prisma.plantCollection.findUnique({
    where: {
      id: collectionId,
    },
  });

  if (!collection) {
    res.status(404).json({ message: "Collection not found" });
  }

  const ownerID = collection?.ownerId;
  console.log(ownerID, userId);

  if (ownerID !== userId) {
    res
      .status(403)
      .json({ message: "Not authorized to add to this collection" });
  }

  const updatedCollection = await prisma.plantCollection.update({
    where: {
      id: collectionId,
    },
    data: {
      plantContents: {
        disconnect: {
          id: plantId,
        },
      },
    },
  });

  res.status(200).json(updatedCollection);
}
