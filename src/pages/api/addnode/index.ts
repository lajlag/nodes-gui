import { PersonDto } from "@component/dto/person";
import prisma from "@component/lib/prisma";
import { calculateNodeHeight } from "@component/lib/utils";
import { DepartmentEnum } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const person: PersonDto = req.body;

    const {
      name,
      parent,
      children,
      manager,
      department,
      developer,
      programming_language,
    } = person;

    let node_height = 0;

    if (parent) {
      node_height = await calculateNodeHeight(person);
    }

    console.log(node_height);

    const parentConnection = parent ? { connect: { id: parent } } : undefined;
    const programmingLanguageConnection = programming_language
      ? { connect: { id: programming_language } }
      : undefined;

    console.log(parentConnection);
    console.log(programmingLanguageConnection);
    const savedPerson = await prisma.person.create({
      data: {
        name,
        parent: parentConnection,
        children: {
          connect: children.map((child) => {
            return { id: child };
          }),
        },
        node_height,
        manager: JSON.parse(manager),
        department: department as DepartmentEnum,
        developer: JSON.parse(developer),
        programming_language: programmingLanguageConnection,
      },
    });

    // console.log(savedPerson);

    // //TODO: Add to DB
    res.status(200).json(person);
    // res.status(200).json(savedPerson);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
