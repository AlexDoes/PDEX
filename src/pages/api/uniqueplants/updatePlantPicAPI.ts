import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const plantData = JSON.parse(req.body);
  const userId = plantData.userId;
  const plantId = plantData.plantInfo.id;
  const image = plantData.image;
  console.log(plantData);
  console.log(plantId);

  const plant = await prisma.uniquePlant.findUnique({
    where: {
      id: plantId,
    },
  });

  if (!plant) {
    res.status(404).json({ message: "No plant found" });
  } else if (plant.ownerId !== userId) {
    res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const updatedPlant = await prisma.uniquePlant.update({
      where: {
        id: plantId,
      },
      data: {
        image: plantData.image,
      },
    });
    console.log(updatedPlant.image);
    res.status(200).json(updatedPlant.image);
  } catch (error) {
    res.status(500).json({ error });
  }
}
