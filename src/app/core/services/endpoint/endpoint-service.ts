import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointFilterRequest, EndpointsResponse } from '../../../models/endpoint.model';
import { API_ROUTES } from '../../../config/api-routes';
import { toHttpParams } from '../../../helpers/utils.helper';
import { Observable } from 'rxjs';
import { DailyReportResponse, EndpointClientFilterRequest, MontlyReportResponse } from '../../../models/endpoint_client.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor(
    private http: HttpClient
  ) {

  }

  getAllEndpoints(request : EndpointFilterRequest) : Observable<EndpointsResponse> {
    const params = toHttpParams(request);
    return this.http.get<EndpointsResponse>(API_ROUTES.ENDPOINT.GET_ALL_LIST, { params });
  }

  //reports
  getMonthlyReport(request : EndpointClientFilterRequest) : Observable<MontlyReportResponse> {
    const params = toHttpParams(request);
    return this.http.get<MontlyReportResponse>(API_ROUTES.REPORT.MONTLY, { params });
  }

  getDailyReport(request : EndpointClientFilterRequest) : Observable<DailyReportResponse> {
    const params = toHttpParams(request);
    return this.http.get<DailyReportResponse>(API_ROUTES.REPORT.DAILY, { params });
  }
}
