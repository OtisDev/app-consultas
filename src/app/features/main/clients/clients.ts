import { Component } from '@angular/core';
import { FilterClient } from './filter-client/filter-client';
import { SharedModule } from '../../../shared/shared-module';
import { Client, ClientFilterRequest } from '../../../models/clients.model';
import { ClientService } from '../../../core/services/client/client-service';
import Swal from 'sweetalert2';
import { Paginate } from '../../../models/response.model';
import { ModalCreateUpdateClient } from './modal-create-update-client/modal-create-update-client';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-clients',
  imports: [FilterClient, SharedModule, ClipboardModule],
  templateUrl: './clients.html',
  styleUrl: './clients.css'
})
export class Clients {

  isLoading: boolean = false;
  loadPaginator: boolean = false;
  load: boolean = false;
  filters!: ClientFilterRequest;
  data: Client[] = [];
  paginate!: Paginate;
  copiedIndex : number = -1;

  constructor(
    private clientService: ClientService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  onFilterChange(filters: ClientFilterRequest) {
    this.filters = filters;
    this.loadData();
  }

  onPageChange(e: Paginate) {
    this.paginate = e;

    this.filters.page = e.current_page;
    this.filters.per_page = e.per_page;
    this.loadData();
  }

  private loadData() {

    this.load = false;
    this.data = [];

    this.clientService.getClients(this.filters).subscribe({
      next: (response) => {
        if (!response.success) {
          Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: response.message
          });
          return;
        }
        this.data = response.data;
        this.paginate = response.meta;
        this.loadPaginator = true;
        this.load = true;
      },error: (error) => {
        this.load = true;
        this.loadPaginator = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar los datos. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    });

  }

  openModalCreateUpdate(item?: Client) {
    const data = {
      action: item ? 'update' : 'create',
      client: item ? item : null
    }
    const myDialog = this.dialog.open(ModalCreateUpdateClient, {
      width: '600px',
      data: data
    });

    myDialog.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.loadData();
      }
    });
  }

  activeBloqued(item: Client) {
    const action = item.state.toString() === '1' ? 'bloquear' : 'activar';

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
        this.updateState(item.id);
      }
    });
  }

  private updateState(id: number) {
    this.clientService.updateState(id).subscribe({
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
        this.loadData();
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

  estado(item: Client): SafeHtml {
    let color = '';
    let text = '';
    switch (item.state.toString()) {
      case '1':
        color = 'green';
        text = 'ACTIVO';
        break;
      case '0':
        color = 'red';
        text = 'INACTIVO';
        break;

    }

    const html = `<span class="badge shade-${color}">${text}</span>`;
    const htmlSeguro: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return htmlSeguro;
  }

  copyToClipboard(index : number){
    this.copiedIndex = index;
    setTimeout(() => {
      this.copiedIndex = -1;
    }, 2000);
  }

  remove(item: Client) {

    Swal.fire({
      title: `¿Estás seguro de eliminar este cliente?`,
      html: `<strong>${item.name}</strong> <br> No podrás revertir esta acción.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeItem(item.id);
      }
    });

  }

  private removeItem(id : number){
    this.isLoading = true;
    this.clientService.softDelete(id).subscribe({
      next: (response) => {

        this.isLoading = false;

        if(response.success === false){
          Swal.fire({
            icon: 'warning',
            title: 'Un momento!',
            text: response.message
          });

          return;
        }
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'El cliente ha sido eliminado exitosamente.'
        });
        this.loadData();

      },
      error: (err) => {
        this.isLoading = false;
        console.log('Error deleting area:', err.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al eliminar el cliente. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    });

  }


}
