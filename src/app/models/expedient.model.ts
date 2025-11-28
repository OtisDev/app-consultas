import { Person } from "./person.model";
import { ResponsePaginated } from "./response.model";
import { DocumentType } from "./document-type.model";

export type registerType = "presencial" | "virtual";

export interface Expedient {
  id?: number;
  ano_eje: string;
  n_expediente: number;
  fecha_doc: string;
  folios: number;
  n_registro: number;
  cod_tipodoc: string;
  asunto: string;
  n_procedimiento: number;
  ano_procedimiento: string;
  area_inicio: number;
  area_resuelve: number;
  idareaini: string; //nombre area inicio
  idareafin: string; //nombre area fin
  register_type: registerType;
  observacion: string;
  fecha_registro: string;
  fecha_reg: string;
  siglas_doc: string;
  idestado: string;
  user_reg: string;
  parasu: string;
  tipo_reg: string;
  fecha_envio: string;
  n_solicitante: string;
  registerType: registerType;
  person: Person;
  document_type: DocumentType;
  item_estado: number;
  tipo_mov_ie: string;
}

export type ExpedienteResponse = ResponsePaginated<Expedient[]>;

export interface ExpedientRequest {
  anio: string;
  codigo?: string; //n_expediente
  n_solicitante?: string;
  areaId?: number;
  page?: number;
  per_page?: number;
  subject?: string;
  unsolved?:number; // 1 o 0
  downloadUnsolved?: boolean;
  group?: number;
  group_name?: string;
}
