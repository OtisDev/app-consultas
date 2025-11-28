export interface Tupa {
  id?: number;
  ano_eje: string;
  n_procedimiento: number;
  n_requisito: number;
  descripcion: string;
  items: TupaDetail[];
}

export interface TupaDetail {
  id?: number;
  ano_eje: string;
  n_procedimiento: number;
  n_requisito: number;
  item: number;
  nom_item: string;
}
