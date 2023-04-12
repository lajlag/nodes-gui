import { API_ENDPOINTS } from "@component/const/api-endpoints";
import { person } from "@prisma/client";
import { PersonProps } from "@component/types/props";

export async function FetchNodes() {
  const environment = process.env.NODE_ENV || "development";
  const apiUrl = environment === "development" ? "http://localhost:3000" : "";

  const response = await fetch(apiUrl + API_ENDPOINTS.ALL_NODES);
  const nodes = await response.json();

  const nodesWithChildren: PersonProps[] = nodes.map((node: PersonObject) => {
    return {
      ...node,
      parent: node.parent_id,
      programming_language: node.programming_language || null,
      children: nodes.filter(
        (child: PersonObject) => child.parent_id === node.id
      ),
    };
  });

  return nodesWithChildren;
}

export async function FetchChildren(id: number) {
  const environment = process.env.NODE_ENV || "development";
  const apiUrl = environment === "development" ? "http://localhost:3000" : "";

  const response = await fetch(
    apiUrl + API_ENDPOINTS.GET_CHILDREN + "?id=" + id
  );
  const children = await response.json();

  return children;
}

interface PersonObject extends person {
  parent: number;
  programming_language: string;
  children: PersonObject[];
}
