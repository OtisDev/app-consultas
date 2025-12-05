import { Response } from "./response.model";

export interface Ruc {
  direccion: string;
  direccion_completa: string;
  ruc: string;
  nombre_o_razon_social: string;
  estado: string;
  condicion: string;
  departamento: string | null;
  provincia: string | null;
  distrito: string | null;
  ubigeo_sunat: string | null;
  es_agente_de_retencion: string;
  es_agente_de_percepcion: string;
  es_agente_de_percepcion_combustible: string;
  es_buen_contribuyente: string;
}

export type RucData = Ruc;

export interface RucFilterRequest{
  ruc : string;
}

export type RucResponse = Response<Ruc>;
