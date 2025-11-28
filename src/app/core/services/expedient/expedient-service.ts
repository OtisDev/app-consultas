import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_ROUTES } from '../../../config/api-routes';
import { Observable } from 'rxjs';
import { ExpedientRequest, ExpedienteResponse } from '../../../models/expedient.model';
import { toHttpParams } from '../../../helpers/utils.helper';

@Injectable({
  providedIn: 'root'
})
export class ExpedientService {

  constructor(private http: HttpClient) { }

  getExpedients(request: ExpedientRequest): Observable<ExpedienteResponse> {
    try {
      const params = toHttpParams(request);
      return this.http.get<ExpedienteResponse>(request.unsolved == 1?  API_ROUTES.EXPEDIENT.UNSOLVED : API_ROUTES.EXPEDIENT.LIST, { params });
    } catch (error) {
      console.error('Error fetching expedients:', error);
      throw error;
    }
  }


  getExpedientHistory(request: ExpedientRequest): Observable<ExpedienteResponse> {
    try {
      const params = toHttpParams(request);
    return this.http.get<ExpedienteResponse>(`${API_ROUTES.EXPEDIENT.HISTORY}`, { params });
    } catch (error) {
      console.error('Error fetching expedient history:', error);
      throw error;
    }

  }

  getExpedientsExport(request: ExpedientRequest): Observable<Blob> {
    try {
      const params = toHttpParams(request);
      return this.http.get<Blob>(API_ROUTES.EXPEDIENT.EXPORT, { params, responseType: 'blob' as 'json' });
    } catch (error) {
      console.error('Error exporting expedients:', error);
      throw error;
    }
  }

}
