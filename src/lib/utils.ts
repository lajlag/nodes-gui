import prisma from "./prisma";
import { PersonDto } from "@component/dto/person";

export async function calculateNodeHeight(person: PersonDto): Promise<number> {
  let nodeHeight = 0;
  let parent = person.parent;

  while (parent) {
    nodeHeight++;
    const parentEntity = await prisma.person.findFirst({
      where: {
        id: person.parent,
      },
    });

    if (!parentEntity || !parentEntity.parent_id) {
      break;
    }

    parent = parentEntity.parent_id;
  }

  return nodeHeight;
}
