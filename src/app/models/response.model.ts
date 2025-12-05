import { DniFilterRequest } from "./dni.model";
import { RucFilterRequest } from "./ruc.model";

export interface Paginated {
  page?: number;
  per_page?: number;
}

export type Paginate = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

export type ResponsePaginated<T> = Response<T> & { meta: Paginate };


export interface ResponseWithoutData {
  success: boolean;
  message: string;
  data: null;
}
