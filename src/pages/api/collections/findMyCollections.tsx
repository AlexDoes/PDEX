import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function findMyCollectionsAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userCollections = await prisma.plantCollection.findMany({
    where: {
      ownerId: String(userId),
    },
  });
  res.status(200).json(userCollections);
}
