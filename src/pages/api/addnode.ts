// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Person } from "../types/person";

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person>
) {
  const { method, body } = req;
  const {
    name,
    parent,
    children,
    nodeHeight,
    manager,
    department,
    developer,
    programmingLanguage,
  } = body;

  switch (method) {
    case "POST":
      //TODO: Add to DB
      res.status(200).json(body);
      break;
  }
}
