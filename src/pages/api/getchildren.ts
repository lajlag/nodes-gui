// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Person } from "../types/person";
import { DEPARTMENT } from "../types/enums";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Person[]>
) {
  res.status(200).json([
    //TODO: Retrieve from DB
    {
      id: 2,
      name: "Kara Thrace",
      parent: 1,
      children: [6, 4],
      nodeHeight: 1,
      manager: true,
      departmentEnum: DEPARTMENT.IT,
      developer: true,
      programmingLanguage: "TypeScript",
    },
    {
      id: 3,
      name: "Gaius Baltar",
      parent: 0,
      children: [],
      nodeHeight: 1,
      manager: true,
      departmentEnum: DEPARTMENT.SALES,
      developer: false,
    },
  ]);
}
