import type { TypeEnum } from "./type.enum";

export interface TreeModel {
  id: string;
  name: string;
  size: string;
  date: Date;
  type: TypeEnum;
  children: TreeModel[];
}
