import { DepartmentEnum } from "@component/const/enums";

export class PersonDto {
  name!: string;
  parent?: number;
  children!: number[];
  node_height!: number;
  manager!: string;
  department?: DepartmentEnum;
  developer!: string;
  programming_language?: number;
}
