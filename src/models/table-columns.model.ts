import { TypeEnum } from "./type.enum";

export interface TableColumnsModel {
  id: string;
  name: string;
  size: string;
  extenstion?: string;
  type: TypeEnum;
  date: Date;
}
