import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const checkUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  const loglocation = "public/log.txt";
  fs.writeFileSync(loglocation, JSON.stringify(req.body), "utf-8");

  if (!checkUser) {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
      },
    });
    res.status(200).json(newUser);
  } else {
    res.status(200).json({ message: "User already exists" });
  }
}

// name: event.user.name,
// email: event.user.email,
// password: hashedPw,
// nickname: event.user.nickname
