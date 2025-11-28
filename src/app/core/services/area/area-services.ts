import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '../../../config/api-routes';
import { AreaRequest, AreaResponse } from '../../../models/area.model';
import { toHttpParams } from '../../../helpers/utils.helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaServices {

  constructor(private http: HttpClient) { }

  getAreas(filterRequest : AreaRequest) : Observable<AreaResponse> {
    const params = toHttpParams(filterRequest);
    return this.http.get<AreaResponse>(API_ROUTES.AREA.LIST, { params });
  }

}
