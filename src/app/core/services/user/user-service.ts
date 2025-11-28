import { Injectable } from '@angular/core';
import { UsersRequest, UsersResponse, User, UserPermisionsRequest, UserPermissionsResponse, UserOfficeProfile, UserCreateUpdateRequest, UserAssignOfficeProfileRequest, UserOfficeProfileResponse } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../../../config/api-routes';
import { toHttpParams } from '../../../helpers/utils.helper';
import { ResponseWithoutData } from '../../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){

  }

  setProfileSession(profileSession: UserOfficeProfile){
    sessionStorage.setItem('profileSession', JSON.stringify(profileSession));
  }

  getProfileSession() : UserOfficeProfile | null {
    const storage = sessionStorage.getItem('profileSession');
    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  }

  getProfileKey() : string {
    const profile = this.getProfileSession();
    return profile ? profile.profile.name_key : '';
  }

  getActiveOffice() : string {
    const profile = this.getProfileSession();
    return profile ? profile.n_oficina : '';
  }

  isAdmin(): boolean {
    return this.getProfileKey() === 'AS' ? true : false;
  }

  isAuthorized(): boolean {
    const profilesAuthorized = ['AS', 'SUP'];
    return profilesAuthorized.includes(this.getProfileKey());
  }

  getUsers(request: UsersRequest) : Observable<UsersResponse>{
    request.state = request.state?.toString() == '0' ? '-1' : request.state;
    const params = toHttpParams(request);
    return this.http.get<UsersResponse>(API_ROUTES.USER.GET_ALL, {params});
  }

  getPermisionsModules(request: UserPermisionsRequest) : Observable<UserPermissionsResponse>{
    return this.http.get<UserPermissionsResponse>(API_ROUTES.USER.GET_PERMISSIONS_MODULES, {params: toHttpParams(request)});
  }

  createUser(request : UserCreateUpdateRequest) : Observable<ResponseWithoutData>{
    return this.http.post<ResponseWithoutData>(API_ROUTES.USER.CREATE, request);
  }

  updateUser(request : UserCreateUpdateRequest) : Observable<ResponseWithoutData>{
    return this.http.put<ResponseWithoutData>(API_ROUTES.USER.UPDATE, request);
  }

  getOfficesProfiles(dni: string): Observable<UserOfficeProfileResponse> {
    return this.http.get<UserOfficeProfileResponse>(API_ROUTES.USER.GET_OFFICES_PROFILES(dni));
  }

  assignOfficeProfile(request : UserAssignOfficeProfileRequest) : Observable<ResponseWithoutData>{
    return this.http.post<ResponseWithoutData>(API_ROUTES.USER.ASSIGN_OFFICE_PROFILE, request);
  }

  updateStateOfficeProfile(id: number, state: number) : Observable<ResponseWithoutData>{
    const body = {
      state:state
    };
    return this.http.put<ResponseWithoutData>(API_ROUTES.USER.UPDATE_STATE_OFFICE_PROFILE(id), body);
  }

  updateStateUser(dni: string, state: number) : Observable<ResponseWithoutData>{
    const body = {
      state:state.toString()
    };
    return this.http.put<ResponseWithoutData>(API_ROUTES.USER.UPDATE_STATE(dni), body);
  }

}
