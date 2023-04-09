import { DEPARTMENT } from "./enums";

export type Person = {
  //TODO: Should be auto-generated in entity
  id: number;
  name: string;
  parent: number;
  children: number[];
  nodeHeight: number;
  manager: boolean;
  departmentEnum?: DEPARTMENT;
  developer: boolean;
  //TODO: Change to relationship with programming language table
  programmingLanguage?: string;
};
