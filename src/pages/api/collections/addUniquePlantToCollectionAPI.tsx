import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log({ req: req.body });
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const data = JSON.parse(req.body);
  const userId: string = data.userId;
  const collectionId: string = data.collectionId;
  const plants: string[] = data.plants;

  const collection = await prisma.plantCollection.findUnique({
    where: {
      id: collectionId,
    },
  });

  if (!collection) {
    res.status(404).json({ message: "Collection not found" });
  }

  const ownerID = collection?.ownerId;

  if (ownerID !== userId) {
    res
      .status(405)
      .json({ message: "Not authorized to add to this collection" });
  }

  console.log(plants);

  const updatedCollection = await prisma.plantCollection.update({
    where: {
      id: collectionId,
    },
    data: {
      plantContents: {
        connect: plants.map((id) => ({ id })),
      },
    },
  });

  res.status(200).json(updatedCollection);
}
