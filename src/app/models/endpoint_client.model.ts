import { Client } from "./clients.model";
import { Endpoint } from "./endpoint.model";
import { Response } from "./response.model";

export interface EndpointClient {
  id: number;
  client_id: number;
  client : Client;
  endpoint_id: number;
  endpoint: Endpoint;
  type_of_query: string;
}

export interface EndpointClientFilterRequest {
  year?: number;
  month?: number;
  client_id?: number;
  endpoint_id?: number;
  endpoint_name?: string;
  type_of_query?: string;
}

//********************************** */
export interface MontlyReport {
  year_ :number;
  month_ : string;
  total : number;
}

export type MontlyReportResponse = Response<MontlyReport[]>;


export interface DailyReport {
  day_ : number;
  month_ : string;
  total : number;
}

export type DailyReportResponse = Response<DailyReport[]>;
