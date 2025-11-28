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

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.loadMenuItems();
  }

  ngOnInit(): void {
    this.routerUrl = this.router.url;

  }

  private loadMenuItems() {
    this.menuItems = this.authService.getModules();
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
      this.getPermisionsModules(req);
    }

  }

  getPermisionsModules(permisionRequest: UserPermisionsRequest) {
    this.loading = true;
    this.userService.getPermisionsModules(permisionRequest).subscribe(response => {
      if (!response.success) {
        this.loading = false;
        Swal.fire("Error", response.message, "error");
        return;
      }

      const modules: Menu[] = response.data;

      this.loading = false;

      this.authService.savePermissions(modules);
      Swal.fire("Correcto!", "Se hizo el cambio de perfil correctamente.", "success").then(() => {
        this.loadMenuItems();
        this.router.navigate(['/']);
      });

    }, error => {
      this.loading = false;
      Swal.fire("Error", "Error en la comunicacion con el servidor.", "error");
      console.log('Error al obtener permisos de módulos:', error);
    });
  }

}
