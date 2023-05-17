import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const commentData = JSON.parse(req.body);
  const commentId = commentData.commentId;
  const userDeleterId = commentData.userId;
  console.log(userDeleterId);
  console.log(commentId);

  try {
    const comment = await prisma.comments.findUnique({
      where: { id: String(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const ownerId = comment?.authorId;

    if (userDeleterId !== ownerId) {
      return res.status(403).json({ message: "Not authorized" });
    } else {
      await prisma.comments.delete({
        where: { id: String(commentId) },
      });
      await prisma.$disconnect();
      res.status(200).json({ message: "Comment deleted" });
    }
  } catch (error: any) {
    await prisma.$disconnect();
    res.status(500).json({ message: `${error.code}` });
  }
}
