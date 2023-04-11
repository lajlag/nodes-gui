import prisma from "@component/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const allPersons = await prisma.person.findMany();

    res.status(200).json(allPersons);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
