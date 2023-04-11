import prisma from "@component/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { query } = req;
    const personId = parseInt(query.id as string, 10);

    const children = await prisma.person.findMany({
      where: {
        parent: {
          id: personId,
        },
      },
    });

    res.status(200).json(children);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
