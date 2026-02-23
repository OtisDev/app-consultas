import { Response } from "./response.model";

export interface Dni {
  numero: string;
  nombre_completo: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  codigo_verificacion: number;
  direccion?: string | null;
  departamento?: string | null;
  provincia?: string | null;
  distrito?: string | null;
  photo_url?: string;
}

export type DniData = Dni;

export interface DniFilterRequest{
  dni : string;
}

export type DniResponse = Response<Dni>;
