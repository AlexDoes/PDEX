import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  console.log("reached;");

  const plantData = JSON.parse(req.body);
  console.log(plantData);
  const userId = plantData.userId;
  const field = plantData.field;
  const plantInfo = plantData.plantInfo;
  const plantId = plantInfo.id;
  const data = plantData.data;

  const plant = await prisma.uniquePlant.findUnique({
    where: {
      id: plantId,
    },
  });

  if (!plant) {
    res.status(403).json({ message: "Unauthorized" });
  } else if (plant.ownerId !== userId) {
    res.status(403).json({ message: "Unauthorized" });
  }

  if (field === "species") {
    const adjustName = data.toLowerCase();
    const titleName = data.charAt(0).toUpperCase() + data.slice(1);
    try {
      const updatedPlant = await prisma.uniquePlant.update({
        where: {
          id: plantId,
        },
        data: {
          species: titleName,
          normalized_species: adjustName,
        },
      });
      prisma.$disconnect();
      res.status(200).json(updatedPlant);
    } catch (error: any) {
      console.log(error);
      prisma.$disconnect();
      res.status(500).json({ message: "Unknown error" });
    }
  } else if (field === "species2") {
    const adjustName = data.toLowerCase();
    const titleName = data.charAt(0).toUpperCase() + data.slice(1);
    try {
      const updatedPlant = await prisma.uniquePlant.update({
        where: {
          id: plantId,
        },
        data: {
          species2: titleName,
          normalized_species2: adjustName,
        },
      });
      prisma.$disconnect();
      res.status(200).json(updatedPlant);
    } catch (error: any) {
      console.log(error);
      prisma.$disconnect();
      res.status(500).json({ message: "Unknown error" });
    }
  } else if (field === "plantWidth" || field === "plantHeight") {
    const updatedPlant = await prisma.uniquePlant.update({
      where: {
        id: plantId,
      },
      data: {
        [field]: data + " cm",
      },
    });
    prisma.$disconnect();
    res.status(200).json(updatedPlant);
  } else {
    const updatedPlant = await prisma.uniquePlant.update({
      where: {
        id: plantId,
      },
      data: {
        [field]: data,
      },
    });
    prisma.$disconnect();
    res.status(200).json(updatedPlant);
  }
}
