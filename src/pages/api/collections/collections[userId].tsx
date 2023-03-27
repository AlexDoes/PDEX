import { NextApiRequest, NextApiResponse } from "next";
import findMyCollectionsAPI from "./[userId]findMyCollectionAPI";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const collections = findMyCollectionsAPI(userId, res);
        res.status(200).json(collections);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
