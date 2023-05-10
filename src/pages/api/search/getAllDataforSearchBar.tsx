import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { toTitleCase } from "lib/generalFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uniquePlant = await prisma.uniquePlant.findMany({
    where: {},
    select: {
      name: true,
    },
    take: 100,
  });

  const species = await prisma.uniquePlant.findMany({
    where: {},
    select: {
      species: true,
    },
    take: 100,
  });

  const users = await prisma.user.findMany({
    where: {
      nickname: {},
    },
    select: {
      nickname: true,
    },
    take: 100,
  });

  const plantSet = new Set<string>();
  const speciesSet = new Set<string>();
  const userSet = new Set<string>();

  uniquePlant.map((item) => {
    item.name && plantSet.add(toTitleCase(item.name));
  });

  species.map((item) => {
    item.species && speciesSet.add(toTitleCase(item.species));
  });

  users.map((item) => {
    item.nickname && userSet.add(toTitleCase(item.nickname));
  });

  const plantsSuggestions = Array.from(plantSet);
  const speciesSuggestions = Array.from(speciesSet);
  const usersSuggestions = Array.from(userSet);

  res.status(200).json({
    plantsSuggestions,
    speciesSuggestions,
    usersSuggestions,
  });
}
