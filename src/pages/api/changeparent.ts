// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Person } from "../types/person";
import { DEPARTMENT } from "../types/enums";

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person>
) {
  const { query, method, body } = req;
  const id = parseInt(query.id as string, 10);
  const newParentId = parseInt(body.newParentId as string, 10);

  switch (method) {
    case "PUT":
      res.status(200).json({
        //TODO: Retrieve from DB and update
        id: 3,
        name: "Gaius Baltar",
        parent: newParentId,
        children: [],
        nodeHeight: 1,
        manager: true,
        departmentEnum: DEPARTMENT.SALES,
        developer: false,
      });
      break;
    default:
      break;
  }
}
