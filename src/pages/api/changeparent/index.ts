import prisma from "@component/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { query, body } = req;
    const personId = parseInt(query.id as string, 10);
    const newParentId = parseInt(body.newParentId as string, 10);

    //TODO: Prisma transactions?
    const newParent = await prisma.person.findUnique({
      where: { id: newParentId },
    });

    if (!newParent) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    const newNodeHeight = newParent.node_height + 1;

    const updatedPerson = await prisma.person.update({
      where: { id: personId },
      data: {
        node_height: newNodeHeight,
        parent: {
          connect: {
            id: newParentId,
          },
        },
      },
    });

    res.status(200).json(updatedPerson);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
