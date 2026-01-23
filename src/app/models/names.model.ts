import { DniData } from "./dni.model";
import { RucData } from "./ruc.model";

export interface NameRecord {
  id: number;
  documento: string;
  nombre: string;
  type_record?: string;
}

export type NameRecordDetail = DniData | RucData | null;
