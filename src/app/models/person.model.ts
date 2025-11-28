export type personType = "n" | "j";

export interface Person {
  id?: number;
  n_solicitante: string;
  tipo: personType;
  dniruc: string;
  razon_social?: string;
  nombre: string;
  nombres?: string;
  apepaterno?: string;
  apmaterno?: string;
  direccion?: string;
  telefono?: string;
  ubigeo?: string;
  email?: string;
}
