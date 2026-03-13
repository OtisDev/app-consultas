import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '../../../config/api-routes';
import { Response } from '../../../models/response.model';
import { NameRecord, NameRecordDetail } from '../../../models/names.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultNameService {
  constructor(
    private http: HttpClient
  ) { }

  config(html?: string): Observable<Response<any>> {
    return this.http.post<Response<any>>(API_ROUTES.CONSULT_NAME.CONFIG, { html });
  }

  search(name: string) {
    return this.http.get<Response<NameRecord[]>>(`${API_ROUTES.CONSULT_NAME.SEARCH}`, {
      params: { s: name }
    });
  }

  show(type: string, id: string) : Observable<Response<NameRecordDetail>>
  {
    return this.http.get<Response<NameRecordDetail>>(API_ROUTES.CONSULT_NAME.SHOW(type, id));
  }
}
