import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultNameService } from '../../../../core/services/names/consult-name-service';
import { NameRecord } from '../../../../models/names.model';
import Swal from 'sweetalert2';
import { Loader } from '../../../../shared/components/loader/loader';
import { UserService } from '../../../../core/services/user/user-service';

@Component({
  selector: 'app-nombre',
  imports: [SharedModule, Loader],
  templateUrl: './nombre.html',
  styleUrl: './nombre.css'
})
export class Nombre {
  formSearch!: FormGroup;
  searching: boolean = false;
  results: NameRecord[] = [];
  selectedIndex: number = -1;
  selectedType: string = 'dni';
  detail?: any | null;
  searchPerformed: boolean = false;
  isAdmin!: boolean;

  findConfig: boolean = false;
  activeButtonConfig: boolean = false;

  constructor(
    private fb: FormBuilder,
    private consultNameService: ConsultNameService,
    private userService: UserService,
  ) {
    this.formSearch = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.isAdmin = this.userService.isAdmin();
  }

  onSubmitSearch(evt: Event) {
    evt.preventDefault();

    if(this.formSearch.value.nombre.trim().length < 3) {
      Swal.fire('Atención', 'Ingrese al menos 3 caracteres para realizar la búsqueda.', 'warning');
      return;
    }

    this.searching = true;
    this.consultNameService.search(this.formSearch.value.nombre).subscribe({
      next: (resp) => {
        if(resp.success) {
          this.results = resp.data || [];
          this.searchPerformed = true;
        } else {
          if(resp.message.toLocaleLowerCase().includes('sesión vencida') || resp.message.toLocaleLowerCase().includes('solicitud inválida')) {
            this.activeButtonConfig = true;
          }
          Swal.fire('Error', resp.message, 'error');
        }
        this.searching = false;
        this.selectedIndex = -1;
      },
      error: (err) => {
        console.error('Error searching name records:', err);
        this.searching = false;
      }
    });
  }

  onSelectResult(index: number, item: NameRecord, evt: PointerEvent) {
    evt.preventDefault();

    this.selectedIndex = index;
    this.selectedType = item.type_record || 'dni';

    this.consultNameService.show(item.type_record || 'dni', item.documento).subscribe({
      next: (resp) => {
        if(resp.success) {
          this.detail = resp.data;
        }
      }
    });
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmitSearch(event);
    }
  }

  handleSearchCredentials() {
    this.findConfig = true;
    this.consultNameService.config().subscribe({
      next: (resp) => {
        if(resp.success) {
          this.activeButtonConfig = false;
          Swal.fire('Actualizado', resp.message, 'success');
        } else {
          Swal.fire('Error', resp.message, 'error');
        }
      },
      complete: () => {
        this.findConfig = false;
      }
    });
  }
}
