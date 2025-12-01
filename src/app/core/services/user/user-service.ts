import { Injectable } from '@angular/core';
import { UsersRequest, UsersResponse, User, UserPermisionsRequest, UserPermissionsResponse, UserOfficeProfile, UserCreateUpdateRequest, UserAssignOfficeProfileRequest, UserOfficeProfileResponse } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../../../config/api-routes';
import { toHttpParams } from '../../../helpers/utils.helper';
import { ResponseWithoutData } from '../../../models/response.model';
import { Role } from '../../../models/role.model';
import { ROLES_MOCKS } from '../../../mocks/roles.mocks';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private roles : Role[] = [];

  constructor(private http: HttpClient){
    this.roles = ROLES_MOCKS;
  }

  setProfileSession(profileSession: string){
    let role : Role = this.roles.find(r => r.key === profileSession)!;
    sessionStorage.setItem('profileSession', JSON.stringify(role));
  }

  getProfileSession() : Role | null {
    const storage = sessionStorage.getItem('profileSession');
    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  }

  getProfileKey() : string {
    const profile : Role = this.getProfileSession()!;
    return profile ? profile.key : '';
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

  createUser(request : UserCreateUpdateRequest) : Observable<ResponseWithoutData>{
    return this.http.post<ResponseWithoutData>(API_ROUTES.USER.CREATE, request);
  }

  updateUser(request : UserCreateUpdateRequest) : Observable<ResponseWithoutData>{
    return this.http.put<ResponseWithoutData>(API_ROUTES.USER.UPDATE, request);
  }

  updateStateUser(id: number, state: number) : Observable<ResponseWithoutData>{
    const body = {
      state:state.toString()
    };
    return this.http.put<ResponseWithoutData>(API_ROUTES.USER.UPDATE_STATE(id), body);
  }

}
