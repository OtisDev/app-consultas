import { ResponsePaginated } from "./response.model";

export interface Area {
  n_oficina: string;
  oficina: string;
  estado: string;
  rep_dni: string;
  rep_datos_completos: string;
  siglas: string;
}

export type AreaResponse = ResponsePaginated<Area[]>;

export interface AreaRequest {
  name?: string;
  state?: number;
  page?: number;
  per_page?: number;
}
