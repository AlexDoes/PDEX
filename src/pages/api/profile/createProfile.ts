import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function createProfileAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
