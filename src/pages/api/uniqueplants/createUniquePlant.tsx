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
  const uniquePlantData = JSON.parse(req.body);
  const createUniquePlant = await prisma.uniquePlant.create({
    data: {
      name: uniquePlantData.plantName,
      description: uniquePlantData.plantDescription,
      image: uniquePlantData.plantImage,
      ownerId: String(uniquePlantData.user), // comment this out to test errors
      species: uniquePlantData.plantSpecies,
      species2: uniquePlantData.plantSubspecies,
      plantHeight: String(
        uniquePlantData.plantHeight + " " + uniquePlantData.unit
      ),
      plantWidth: String(
        uniquePlantData.plantWidth + " " + uniquePlantData.unit
      ),
    },
  });

  res.status(200).json(createUniquePlant);
}
