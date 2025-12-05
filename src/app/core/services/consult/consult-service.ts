import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DniFilterRequest, DniResponse } from '../../../models/dni.model';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../../config/api-routes';
import { RucFilterRequest, RucResponse } from '../../../models/ruc.model';
import { environment } from '../../../../environments/environment';
import { SKIP_AUTH_HEADER } from '../../../config/http-context-keys';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  constructor(private http: HttpClient) { }

  private header(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.api_key}`,
    });
    const context = new HttpContext().set(SKIP_AUTH_HEADER, true);
    return { headers: headers, context: context };
  }

  getDniData(request : DniFilterRequest) : Observable<DniResponse>{
    return this.http.post<DniResponse>(API_ROUTES.CONSULT.DNI, request, this.header());
  }

  getRucData(request: RucFilterRequest) : Observable<RucResponse>{
    return this.http.post<RucResponse>(API_ROUTES.CONSULT.RUC, request, this.header());
  }


}
