import { Component, ElementRef, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { Header } from '../common/header/header';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MenuItem } from '../../models/menu-item.model';
import { SharedModule } from '../../shared/shared-module';
import { AuthService } from '../../core/services/auth/auth-service';
import { User, UserOfficeProfile, UserPermisionsRequest, UserR } from '../../models/user.model';
import { UserService } from '../../core/services/user/user-service';

@Component({
  selector: 'app-main-layout',
  imports: [Header, SharedModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

  @ViewChild('pageWrapper') pageWrapper!: ElementRef;
  page! : MenuItem;
  private renderer! : Renderer2;
  changeProfile : boolean = false;
  requestProfile! : UserPermisionsRequest | null;

  user! : User;
  officesProfiles : UserOfficeProfile[] = [];
  profileSession! : UserOfficeProfile | null;

  constructor(private router: Router, private route : ActivatedRoute,
    rendererFactory: RendererFactory2,
    private authService : AuthService,
    private userService : UserService
  ){
    this.page = this.dataActivatedRoute(this.route);
    this.renderer = rendererFactory.createRenderer(null, null);

  }

  ngOnInit(): void {
    this.user = this.authService.getUserData() as User;

    const profile = this.userService.getProfileKey()

  }

  toggleSidebar(click : boolean = true){
    if(!click){
      return;
    }
    this.toggleClass(this.pageWrapper,"toggled");
  }

  toggleClass(el : ElementRef, css : string){
    if (el.nativeElement.classList.contains(css)) {
      this.renderer.removeClass(el.nativeElement, css);
    } else {
      this.renderer.addClass(el.nativeElement, css);
    }
  }

  dataActivatedRoute(active : ActivatedRoute){
    let route : MenuItem = {
      name: "",
      icon: "bi bi-house",
      path: "",
      children: []
    }

    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      let currentRoute = active.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
      currentRoute.data.subscribe(data => {

        route["name"] = data["name"] ? data["name"] : "";
        route["icon"] = data["icon"] ? data["icon"] : "";
      });
    });

    return route;
  }

  logout(event : any){

    event.preventDefault();

    Swal.fire({
      title: "Está seguro de cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
    }).then((result) => {
      if (result.isConfirmed) {

        this.authService.logout(false);

        const confirm = Swal.fire("Exito!","Se cerró sesion exitosamente.","success");
        confirm.then((data) => {
          this.router.navigate(['/login'])
        });

      }
    });
  }

  onChangeProfile(event : any){

  }

}
