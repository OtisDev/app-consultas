import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FiltroUser } from "./filtro-user/filtro-user";
import { User, UserR, UsersRequest } from '../../../../models/user.model';
import { Paginate } from '../../../../models/response.model';
import { UserService } from '../../../../core/services/user/user-service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateUpdateUser } from './modal-create-update-user/modal-create-update-user';
import { ModalOfficesProfiles } from './modal-offices-profiles/modal-offices-profiles';

@Component({
  selector: 'app-users',
  imports: [SharedModule, FiltroUser],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {

  isLoading: boolean = false;
  filters!: UsersRequest;
  paginate!: Paginate;
  loadPaginator: boolean = false;
  load: boolean = false;

  data: UserR[] = [];

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private dialog : MatDialog
  ) { }

  loadAllUsers() {

    this.load = false;
    this.data = [];

    this.userService.getUsers(this.filters).subscribe(response => {
      this.data = response.data;
      this.load = true;
      this.loadPaginator = true;
      this.paginate = response.meta;
      if (!response.success) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: response.message
        });

        return;
      }
    }, error => {
      this.load = true;
      this.loadPaginator = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al cargar los usuarios. Por favor, inténtelo de nuevo más tarde.'
      });
    });

  }

  onFilterChange(filter: UsersRequest) {

    this.filters = filter;

    this.loadAllUsers();
  }

  onPageChange(e: Paginate) {
    this.paginate = e;

    this.filters.page = e.current_page;
    this.filters.per_page = e.per_page;
    this.loadAllUsers();
  }

  nivel(user: User): string {
    switch (user.Nivel) {
      case 'AS':
        return 'Admin';
      case 'CO':
        return 'Coordinador';
      case 'U':
        return 'Usuario';
      default:
        return '';
    }
  }

  areaAsignada(user: UserR): SafeHtml {
    let color = '';
    let text = '';
    const txt =  user.offices_profiles.length > 0 ? 'S' : 'N';
    switch (txt) {
      case 'S':
        color = 'green';
        text = 'SI';
        break;
      case 'N':
        color = 'red';
        text = 'NO';
        break;

    }

    const html = `<span class="badge shade-${color}">${text}</span>`;
    const htmlSeguro: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return htmlSeguro;
  }

  estado(user: User): SafeHtml {
    let color = '';
    let text = '';
    switch (user.state.toString()) {
      case '1':
        color = 'green';
        text = 'Activo';
        break;
      case '0':
        color = 'red';
        text = 'Inactivo';
        break;

    }

    const html = `<span class="badge shade-${color}">${text}</span>`;
    const htmlSeguro: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return htmlSeguro;
  }

  openModalUser(user?: User) {
    const data = {
      action:  user ? 'update' : 'create',
      user: user ? user : null
    }
    const myDialog = this.dialog.open(ModalCreateUpdateUser,{
      width: '600px',
      data: data
    });

    myDialog.afterClosed().subscribe( (result : boolean) => {

      if (result) {
        this.loadAllUsers();
      }
    });
  }

  openModalOfficesProfiles(user: User) {

    const myDialog = this.dialog.open(ModalOfficesProfiles,{
      width: '800px',
      data: user
    });

    myDialog.afterClosed().subscribe( (result : boolean) => {
      if (result) {
        this.loadAllUsers();
      }
    });
  }

  activeBloquedUser(user: User) {
    const action = user.state.toString() === '1' ? 'bloquear' : 'activar';

    Swal.fire({
      title: `¿Estás seguro de ${action} este usuario?`,
      text: "",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateUserState(user.DNI, user.state.toString() === '1' ? 0 : 1);
      }
    });
  }

  private updateUserState(dni: string, state: number) {
    this.userService.updateStateUser(dni, state).subscribe({
      next: (response) => {
        if (!response.success) {
          Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: response.message
          });
          return;
        }

        Swal.fire({
          title: "Exito!",
          text: "Estado del usuario actualizado exitosamente.",
          icon: "success"
        });
        this.loadAllUsers();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar el estado del usuario. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    });
  }

  profilesAssigned(user : UserR) : SafeHtml {

    const profiles = user.offices_profiles.map(op => op.profile.name);
    const html = profiles.length > 0 ? profiles.join(' <b>|</b> ') : '- Ninguno -';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
