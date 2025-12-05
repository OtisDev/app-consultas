import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../../../config/api-routes';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserLoginRequest, UserR, UserResponse, UserSession, UserModule, TokenResponse, UserOfficeProfile, User } from '../../../models/user.model';
import { Menu, MenuItem } from '../../../models/menu-item.model';
import { Response } from '../../../models/response.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: User;
  token: string | null = null;
  private modules!: MenuItem[];
  permissions!: Menu[];
  officesProfiles: UserOfficeProfile[] = [];
  rolesKeys: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.init();
  }

  init() {
    const user : User | null  = this.getUserData();

    if (user) {
      this.user = user;
      this.token = this.getToken();
      this.rolesKeys = [this.user.role];
    }

  }

  getUserData() : User | null {
    const storage = sessionStorage.getItem('user');

    if (storage) {
      const userData = JSON.parse(storage);
      return userData;
    }

    return null;

  }

  isLoggedIn(): boolean {
    const user : User | null = this.getUserData();
    return user ? true : false;
  }

  saveLocalStorage(userData: UserSession) {
    sessionStorage.setItem('user', JSON.stringify(userData.user));
    this.saveToken(userData.access_token);
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

  login(request: UserLoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(API_ROUTES.AUTH.LOGIN, request);
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
    this.clearStorage();
    this.user = {} as User;
    this.token = null;
    this.modules = [];
    this.permissions = [];

    if (redirect) {
      const confirm = Swal.fire({
        icon: 'info',
        title: 'Sesión finalizada',
      });

      confirm.then((result) => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.rolesKeys.includes(role));
  }

  clearStorage(){
    localStorage.clear();
    sessionStorage.clear();
  }

}
