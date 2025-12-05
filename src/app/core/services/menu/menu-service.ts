import { Injectable } from '@angular/core';
import { Router, Routes, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { MenuItem } from '../../../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);

  public menuItems$ = this.menuItemsSubject.asObservable();

  private currentProfile: string | null = null;

  constructor(private router: Router) {
    this.subscribeToRoutesRecognized();
  }

  private subscribeToRoutesRecognized(): void {
    this.router.events.pipe(
      filter(event => event instanceof RoutesRecognized)
    ).subscribe(() => {
      // Solo regenerar si ya tenemos un perfil definido
      if (this.currentProfile) {
        const newMenuItems = this.generateMenuItems(this.currentProfile, this.router.config);
        this.menuItemsSubject.next(newMenuItems);
      }
    });
  }

  public getMenuItems(profile: string): Observable<MenuItem[]> {
    // Si el perfil cambia, actualizamos el perfil y disparamos la generación (sincrónico)
    if (this.currentProfile !== profile) {
      this.currentProfile = profile;

      const newMenuItems = this.generateMenuItems(this.currentProfile, this.router.config);
      this.menuItemsSubject.next(newMenuItems);
    }

    return this.menuItems$;
  }

  private generateMenuItems(profile: string, routes: Routes, parentPath: string = ''): MenuItem[] {
    let menuItems: MenuItem[] = [];

    const mainRouteConfig = routes.find(route =>
      route.path === '' && route.children
    );

    if (!mainRouteConfig || !mainRouteConfig.children) {
      console.error('No se encontró la configuración de ruta principal con children.');
      return [];
    }

    const childrenRoutes = mainRouteConfig.children as Routes;

    childrenRoutes.forEach((route: any) => {

      const path = parentPath + (route.path ? `/${route.path}` : '');

      if (route.data && route.data.name) {

        const isAllowed = route.data.allow && (route.data.allow.includes(profile) || route.data.allow.includes('all'));

        if (isAllowed) {

          const showMenu = route.data.showMenu !== false;

          if (showMenu) {
            let item: MenuItem = { name: route.data.name, path, icon: '', children: [] };
            item.icon = route.data.icon || '';

            // Lógica recursiva para submenús
            if (route.children) {
              item.children = this.generateMenuItems(profile, route.children, path);
            } else {
              item.children = [];
            }

            menuItems.push(item);
          }
        }
      }
    });

    return menuItems;
  }


}
