import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '../../../config/api-routes';
import { ProfileRequest, ProfileResponse } from '../../../models/profile.model';
import { Observable } from 'rxjs';
import { toHttpParams } from '../../../helpers/utils.helper';
import { ResponseWithoutData } from '../../../models/response.model';
import { UserAssignOfficeProfileRequest } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  getProfiles(request : ProfileRequest) : Observable<ProfileResponse>{
    const params = toHttpParams(request);
    return this.http.get<ProfileResponse>(API_ROUTES.PROFILE.LIST, { params });
  }



}
