import { Component, effect, untracked } from '@angular/core';
import { ExpedientService } from '../../../core/services/expedient/expedient-service';
import { Expedient, ExpedientRequest } from '../../../models/expedient.model';
import { SharedModule } from '../../../shared/shared-module';
import { Filtro } from './filtro/filtro';
import { Paginate } from '../../../models/response.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewPdf } from '../../../shared/components/modal-view-pdf/modal-view-pdf';
import Swal from 'sweetalert2';
import { PdfService } from '../../../core/services/pdf/pdf-service';
import { UserService } from '../../../core/services/user/user-service';

@Component({
  selector: 'app-seguimiento',
  imports: [SharedModule, Filtro],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.css'
})
export class Seguimiento {

  load: boolean = false;
  isLoading: boolean = false;
  data: Expedient[] = [];
  paginate!: Paginate;
  loadPaginator: boolean = false;
  filters!: ExpedientRequest;
  profile!: string ;
  office!: string ;
  isAdmin: boolean = false;

  constructor(
    private expedientService: ExpedientService,
    private dialog: MatDialog,
    private pdfService: PdfService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.profile = this.userService.getProfileKey();
    this.office = this.userService.getActiveOffice();
    this.isAdmin = this.userService.isAdmin();
  }

  private loadExpedients() {
    this.load = false;
    this.data = [];

    this.expedientService.getExpedients(this.filters).subscribe(response => {
      this.data = response.data;
      this.load = true;
      this.loadPaginator = true;
      this.paginate = response.meta;

      if(!response.success){
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: response.message
        });
      }

    }, error => {
      this.load = true;
      this.loadPaginator = false;
      console.log('Error loading expedients:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al cargar los expedientes. Por favor, inténtelo de nuevo más tarde.'
      });
    });
  }

  downloadExpedients() {

    console.log('Download expedients with filters:', this.filters);

    const action = this.filters.group === 0 ? 'todos los expedientes' : `los expedientes con estado "${this.filters.group_name}"`;

    Swal.fire({
      title: `¿Estás seguro de exportar ${action}?`,
      text: "",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.filters.unsolved && this.filters.unsolved == 1){
          this.downloadExpedientsUnsolved();
        }else{
          this.downloadExpedientsExport();
        }
      }
    });


  }

  private downloadExpedientsUnsolved(){
    const req : ExpedientRequest = {
      ...this.filters,
      per_page: -1
    }

    this.isLoading = true;
    this.expedientService.getExpedients(req).subscribe(response => {
      const data = response.data;
      this.isLoading = false;

      if(data.length === 0){

        Swal.fire({
          icon: 'info',
          title: 'Atención',
          text: 'No hay datos para generar el reporte.'
        });
        return;
      }

      if(!response.success){
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: response.message
        });

        return;
      }
      const unique = new Date().getTime();
      this.pdfService.exportToExcel(data, `reporte_expedientes_${unique}.xlsx`);

    }, error => {
      this.isLoading = false;
      console.log('Error loading expedients:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al cargar los expedientes. Por favor, inténtelo de nuevo más tarde.'
      });
    });
  }

  onFilterChange(filter: ExpedientRequest) {
    //console.log("filter change", filter);
    this.filters = filter;

    this.loadExpedients(); // ejecuta el servicio
  }

  onPageChange(e: Paginate) {
    this.paginate = e;

    this.filters.page = e.current_page;
    this.filters.per_page = e.per_page;
    this.loadExpedients(); // volver a ejecutar servicio con nueva página
  }

  viewHistory(item: Expedient) {

    const request: ExpedientRequest = {
      anio: item.ano_eje,
      codigo: item.n_expediente.toString()
    }

    const myDialog = this.dialog.open(ModalViewPdf, {
      panelClass: 'pdf-dialog',
      width: '900px',
      height: '700px',
      data: item,

    });

  }

  textColor(item: Expedient, type='class'): string {
    let color = type == 'class' ? '' : 'secondary';

    switch (item.item_estado.toString()){
      case '3':
      case '4':
      case '2':
        color = type == 'class' ? 'text-blue' : 'blue';
        break;
      case '6':
      case '8':
        color = type == 'class' ? 'text-green' : 'green';
        break;
      case '9':
        color = type == 'class' ? 'text-red' : 'red';
        break;
    }

    return color;
  }

  private downloadExpedientsExport(){
    const req : ExpedientRequest = {
      ...this.filters,
    }

    this.isLoading = true;

    this.expedientService.getExpedientsExport(req).subscribe({
      next: (blob) => {
        console.log('Blob received for export:', blob);
        const unique = new Date().getTime();
        this.pdfService.downloadBlob(blob, `expedientes_${unique}.xlsx`);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log('Error exporting expedients:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al exportar los expedientes. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    });
  }

}
