import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '../../../config/api-routes';
import { ClientCreateUpdateRequest, ClientFilterRequest, ClientResponse, ClientsResponse } from '../../../models/clients.model';
import { Observable } from 'rxjs';
import { toHttpParams } from '../../../helpers/utils.helper';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getClients(params : ClientFilterRequest) : Observable<ClientsResponse> {
    const request = toHttpParams(params);
    return this.http.get<ClientsResponse>(API_ROUTES.CLIENTS.GET_ALL, { params: request });
  }

  getClientsList(params : ClientFilterRequest) : Observable<ClientsResponse> {
    const request = toHttpParams(params);
    return this.http.get<ClientsResponse>(API_ROUTES.CLIENTS.GET_ALL_LIST, { params: request });
  }

  createClient(data: ClientCreateUpdateRequest) : Observable<ClientResponse>{
    return this.http.post<ClientResponse>(API_ROUTES.CLIENTS.CREATE, data);
  }

  updateClient(data: ClientCreateUpdateRequest, id: number) : Observable<ClientResponse> {
    return this.http.put<ClientResponse>(API_ROUTES.CLIENTS.UPDATE(id), data);
  }

  updateState(id: number) : Observable<ClientResponse> {
    return this.http.patch<ClientResponse>(API_ROUTES.CLIENTS.UPDATE_STATE(id), {});
  }

  softDelete(id: number) : Observable<ClientResponse> {
    return this.http.delete<ClientResponse>(API_ROUTES.CLIENTS.DELETE(id));
  }

}
