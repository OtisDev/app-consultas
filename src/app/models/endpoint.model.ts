import { Paginated, Response } from "./response.model";

export interface Endpoint{
  id: number;
  name: string;
  state : number;
}

export type EndpointFilterRequest = Paginated & {
  name?: string;
  state?: number;
}

export type EndpointsResponse = Response<Endpoint[]>;
