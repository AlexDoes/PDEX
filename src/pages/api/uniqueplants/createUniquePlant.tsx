import { PrismaClient, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
interface error {
  message: string;
}
type Error = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const uniquePlantData = JSON.parse(req.body);
  try {
    const createUniquePlant = await prisma.uniquePlant.create({
      data: {
        name: uniquePlantData.plantName,
        description: uniquePlantData.plantDescription,
        image: uniquePlantData.plantImage,
        ownerId: String(uniquePlantData.user),
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
    }
    console.log("error");
    res.status(500).json({ message: "Error creating unique plant" });
  }
}