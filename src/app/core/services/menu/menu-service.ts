import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs';
import { MenuItem } from '../../../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  private menuItems: MenuItem[] = [];

  constructor(private router: Router) { }

  private routesRecognized(profile: string){
    this.menuItems = [];
    this.router.events.pipe(
      filter(event => event instanceof RoutesRecognized)
    ).subscribe(() => {
      this.menuItems = this.generateMenuItems(profile,this.router.config);
    });
  }

  private generateMenuItems(profile: string,routes: any[], parentPath: string = '') {
    let menuItems : MenuItem[] = [];
    routes.forEach(route => {
      const path = parentPath + (route.path ? `/${route.path}` : '');
      if (route.data && route.data.name) {

        const name : string = route.data.name;
        let arr = menuItems.filter(m => m.name === name);
        if(route.data.allow && arr.length == 0 && (route.data.allow.includes(profile) || route.data.allow.includes("all"))){

          route.data["showMenu"] = route.data.showMenu === false ? false : true;

          if(route.data.showMenu){
            let item : any = { name: route.data.name, path };
            item["icon"] = route.data.icon ? route.data.icon : '';
            item["children"] = route.children ? this.generateMenuItems(profile,route.children, path) : [];

            item["allow"] = route.allow ? route.allow : [];
            this.menuItems.push(item);
            menuItems.push(item);
          }

        }

      }
    });
    return menuItems;
  }

  getMenuItems(profile : string): any[] {
    this.routesRecognized(profile);
    return this.menuItems;
  }

}
