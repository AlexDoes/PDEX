import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import { hash } from "bcrypt";

import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = JSON.parse(req.body);
  const password = data.password;
  const email = data.email;

  if (password.length === 0) {
    return res.status(400).json({ message: "Password cannot be empty" });
  } else if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const hashedPassword = await hash(password, 12);
  const standardizedemail = email.toLowerCase();

  try {
    const newUser = await prisma.user.create({
      data: {
        email: standardizedemail,
        password: hashedPassword,
      },
    });
    res.status(200).json(newUser);
  } catch (error: any) {
    console.log(error.code);
    if (error.code === "P2002") {
      res.status(500).json({ message: "The email is already in use." });
    }
    res.status(500).json({ message: "Unknown error" });
  }
}
