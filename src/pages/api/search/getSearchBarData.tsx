import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { toTitleCase } from "lib/generalFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  const uniquePlant = await prisma.uniquePlant.findMany({
    where: {
      name: {
        contains: req.query.searchTerm as string,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
    },
    take: 5,
  });

  const species = await prisma.uniquePlant.findMany({
    where: {
      species: {
        contains: req.query.searchTerm as string,
        mode: "insensitive",
      },
    },
    take: 5,
  });

  const users = await prisma.user.findMany({
    where: {
      nickname: {
        contains: req.query.searchTerm as string,
        mode: "insensitive",
      },
    },
    select: {
      nickname: true,
    },
    take: 5,
  });

  const set = new Set<string>();

  uniquePlant.map((item) => {
    set.add(toTitleCase(item.name));
  });

  species.map((item) => {
    item.species && set.add(toTitleCase(item.species));
  });

  users.map((item) => {
    item.nickname && set.add(toTitleCase(item.nickname));
  });

  const suggestions = Array.from(set);

  res.status(200).json(suggestions);
}
