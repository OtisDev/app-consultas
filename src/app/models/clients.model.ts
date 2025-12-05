import { Paginated, Response, ResponsePaginated } from "./response.model";

export interface Client {
  id: number;
  name: string;
  api_token: string;
  state: number;
}

export type ClientFilterRequest = Paginated & {
  name?: string;
  state?: number;
}

export type ClientsResponse = ResponsePaginated<Client[]>;
export type ClientResponse = Response<null>;

export type ClientCreateUpdateRequest = {
  name: string;
}
