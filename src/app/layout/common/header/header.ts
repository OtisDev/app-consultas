import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Menu, MenuItem } from '../../../models/menu-item.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth/auth-service';
import { UserService } from '../../../core/services/user/user-service';
import { LoadingOverlay } from '../../../shared/components/loading-overlay/loading-overlay';
import { UserPermisionsRequest } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { MENUITEMS_MOCKS } from '../../../mocks/menu.mock';
import { MenuService } from '../../../core/services/menu/menu-service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatIconModule, LoadingOverlay],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  @Output() clickMenu = new EventEmitter<boolean>();
  @Input() newMenu!: boolean;
  @Input() requestProfile!: UserPermisionsRequest | null;
  menuItems: MenuItem[] = [];
  loading: boolean = false;

  activeIndex: number | null = null;
  activeUrl: string = '';
  routerUrl: string = '';
  profile : string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private menuService : MenuService
  ) {
    this.loadMenuItems();
  }

  ngOnInit(): void {
    this.routerUrl = this.router.url;

  }

  private loadMenuItems() {
    //this.menuItems = MENUITEMS_MOCKS;
    this.profile = this.userService.getProfileKey();
    this.menuService.getMenuItems(this.profile).subscribe(items => {
      this.menuItems = items;
    })

  }

  pressClick(hasChildren: boolean = false) {
    this.clickMenu.emit(!hasChildren)
  }

  toggleMenu(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  activeChildren(children: Menu[], i: number): boolean {

    const find = children.find(item => `/${item.path}` === this.routerUrl);

    if (find) {
      this.activeIndex = i;
    }

    return !!find;

  }


  ngOnChanges(changes: SimpleChanges): void {

    //this.menuItems = this.authService.getModules();
    const req : UserPermisionsRequest | null = changes['requestProfile'].currentValue;

    if(req){

    }

  }



}
