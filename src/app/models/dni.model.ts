import { Response } from "./response.model";

export interface Dni {
  numero: string;
  nombre_completo: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  codigo_verificacion: number;
}

export type DniData = Dni;

export interface DniFilterRequest{
  dni : string;
}

export type DniResponse = Response<Dni>;
