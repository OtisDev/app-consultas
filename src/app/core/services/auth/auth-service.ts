import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../../../config/api-routes';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserLoginRequest, UserR, UserResponse, UserSession, UserModule, TokenResponse, UserOfficeProfile } from '../../../models/user.model';
import { Menu, MenuItem } from '../../../models/menu-item.model';
import { Response } from '../../../models/response.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: UserR;
  token: string | null = null;
  private modules!: MenuItem[];
  permissions!: Menu[];
  officesProfiles: UserOfficeProfile[] = [];


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.init();
  }

  init() {
    const storage = sessionStorage.getItem('user');

    if (storage) {
      const userData = JSON.parse(storage);

      if(userData.user){
        this.user = userData.user;
        this.token = this.getToken();
        this.permissions = this.getPermissions();
      }

    }

  }

  getUserData() : UserR | null {
    const storage = sessionStorage.getItem('user');

    if (storage) {
      const userData = JSON.parse(storage);
      return userData.user;
    }

    return null;

  }

  isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  saveLocalStorage(user: UserSession) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.saveToken(user.access_token);
    this.init();
  }

  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    const t = sessionStorage.getItem('token');
    if (t) {
      return t;
    }
    return null;
  }

  saveOfficesProfiles(officesProfiles: UserOfficeProfile[]) {
    sessionStorage.setItem('offices_profiles', JSON.stringify(officesProfiles));
  }

  getOfficesProfiles(): UserOfficeProfile[] {
    const profiles = sessionStorage.getItem('offices_profiles');
    if (profiles) {
      return JSON.parse(profiles);
    }
    return [];
  }

  savePermissions(permissions: Menu[]) {
    sessionStorage.setItem('user_permissions', JSON.stringify(permissions));
  }

  getPermissions(): Menu[] {
    const permissions = sessionStorage.getItem('user_permissions');
    if (permissions) {
      return JSON.parse(permissions);
    }
    return [];
  }

  login(request: UserLoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(API_ROUTES.AUTH.LOGIN, request);
  }

  isAdmin(): boolean {
    return this.user.Nivel === 'AS' ? true : false;
  }

  isAuthorized(): boolean {
    return this.user.Nivel === 'AS' || this.user.Nivel === 'CO' ? true : false;
  }

  hasAccess(route: string): boolean {
    const filtered = this.permissions.find(p => `/${p.path}` === route);
    return !filtered ? false : true;
  }

  loadModules(): MenuItem[] {
    const modules: MenuItem[] = [];
    const parents = this.permissions.filter(p => !p.parent_id);
    const children = this.permissions.filter(p => p.parent_id);

    // 1. Crear los módulos padres
    for (const parent of parents) {
      modules.push({
        id: parent.id,
        name: parent.name,
        icon: parent.icon,
        path: parent.path,
        parent_id: null,
        children: []
      });
    }

    // 2. Asociar hijos a sus padres
    for (const child of children) {
      const parent: any = modules.find((m: MenuItem) => m.id === child.parent_id);
      if (parent) {
        parent.children.push({
          id: child.id,
          name: child.name,
          icon: child.icon,
          path: child.path,
          parent_id: child.parent_id,
          children: []
        });
      }
    }

    return modules;
  }

  getModules(): MenuItem[] {
    this.permissions = this.getPermissions();
    this.modules = this.loadModules();
    let insert = {
      id: 0,
      name: 'Inicio',
      icon: 'bi bi-house',
      path: '/',
      parent_id: null,
      children: []
    };

    const findInit = this.modules.find(m => m.id === insert.id);
    if(!findInit) this.modules.unshift(insert);

    return this.modules;
  }

  refreshToken(): Observable<Response<TokenResponse>> {
    return this.http.post<Response<TokenResponse>>(API_ROUTES.AUTH.REFRESH, {}).pipe(
      map(response => {
        if(response.success){
          this.saveToken(response.data.access_token);
        }

        return response
      }), catchError(error => {
        return throwError(() => error);
      })
    );
  }

  logout(redirect: boolean = true){
    localStorage.clear();
    sessionStorage.clear();
    this.user = {} as UserR;
    this.token = null;
    this.modules = [];
    this.permissions = [];

    if (redirect) {
      const confirm = Swal.fire({
        icon: 'info',
        title: 'Sesión finalizada',
      });

      confirm.then((result) => {
        this.router.navigate(['/login']);
      });
    }
  }

}
