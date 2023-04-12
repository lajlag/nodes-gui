export interface PersonProps {
  id: number;
  name: string;
  parent?: number;
  children?: PersonProps[];
  node_height: number;
  manager: boolean;
  department?: string;
  developer: boolean;
  programming_language?: string;
}
