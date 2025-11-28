import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FiltroProfile } from './filtro-profile/filtro-profile';
import { Profile, ProfileRequest, ProfileWithModules } from '../../../../models/profile.model';
import { Paginate } from '../../../../models/response.model';
import { ProfileService } from '../../../../core/services/profile/profile-service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-profiles',
  imports: [SharedModule,FiltroProfile],
  templateUrl: './profiles.html',
  styleUrl: './profiles.css'
})
export class Profiles {

  loadPaginator: boolean = false;
  filters! : ProfileRequest;
  paginate! : Paginate;
  load : boolean = false;
  data : ProfileWithModules[] = [];

  constructor(
    private profileService : ProfileService,
    private sanitizer: DomSanitizer,
  ) { }

  onFilterChange(filter: ProfileRequest) {

    this.filters = filter;
    this.loadAllProfiles();
  }

  onPageChange(e: Paginate) {
    this.paginate = e;

    this.filters.page = e.current_page;
    this.filters.per_page = e.per_page;
    this.loadAllProfiles();
  }

  private loadAllProfiles(){
    this.load = false;
    this.data = [];
    this.profileService.getProfiles(this.filters).subscribe({
      next: response => {
        this.data = response.data;
        this.paginate = response.meta;
        this.load = true;
        this.loadPaginator = true;
      },
      error: err => {
        this.load = true;
        this.loadPaginator = false;
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al traer los perfiles. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    })
  }

  permisos(item: ProfileWithModules): SafeHtml {
    let color = 'red';
    let text = 'NO';

    if(item.modules && item.modules.length > 0){
      color = 'green';
      text = 'SI';
    }

    const html = `<span class="badge shade-${color}">${text}</span>`;
    const htmlSeguro: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return htmlSeguro;
  }

  estado(item: ProfileWithModules): SafeHtml {
    let color = '';
    let text = '';
    switch (item.state.toString()) {
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

  activeBloqued(item: Profile){
    const action = item.state.toString() === '1' ? 'bloquear' : 'activar';
  }

}
