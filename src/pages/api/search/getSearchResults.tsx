import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { toTitleCase } from "lib/generalFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uniquePlants = await prisma.uniquePlant.findMany({
    where: {
      name: {
        contains: req.query.searchTerm as string,
        mode: "insensitive",
      },
    },
    take: 20,
  });

  const species = await prisma.uniquePlant.findMany({
    where: {
      species: {
        contains: req.query.searchTerm as string,
        mode: "insensitive",
      },
    },
    take: 20,
  });

  const users = await prisma.user.findMany({
    where: {
      nickname: {
        contains: req.query.searchTerm as string,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      nickname: true,
      image: true,
    },
    take: 20,
  });

  return {
    props: {
      uniquePlants,
      species,
      users,
    },
  };
}
