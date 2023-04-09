// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

enum DEPARTMENT {
  "IT",
  "HR",
  "SALES",
  "MARKETING",
  "FINANCE",
  "ADMIN",
}

type Person = {
  id: number;
  name: string;
  parent: number;
  children: number[];
  nodeHeight: number;
  manager: boolean;
  department?: DEPARTMENT;
  developer: boolean;
  //TODO: Change to relationship with programming language table
  programmingLanguage?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Person[]>
) {
  res.status(200).json([
    {
      id: 2,
      name: "Kara Thrace",
      parent: 1,
      children: [6, 4],
      nodeHeight: 1,
      manager: true,
      department: DEPARTMENT.IT,
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
      department: DEPARTMENT.SALES,
      developer: false,
    },
  ]);
}
