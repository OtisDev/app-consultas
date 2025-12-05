import { Component} from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { DniData, DniFilterRequest } from '../../../../models/dni.model';
import { FiltroDni } from './filtro-dni/filtro-dni';
import { ConsultService } from '../../../../core/services/consult/consult-service';

@Component({
  selector: 'app-dni',
  imports: [FiltroDni, SharedModule],
  templateUrl: './dni.html',
  styleUrl: './dni.css'
})
export class Dni {

  loading : boolean = false;
  load : boolean = false;
  filter! : DniFilterRequest;
  message : string = '';

  data: DniData = {} as DniData;
  resetData : DniData = {
    numero: '',
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    nombre_completo: '',
    codigo_verificacion: 0
  }


  constructor(
    private consultService : ConsultService
  ) {

    this.data = {...this.resetData};
  }

  loadData() {
    this.loading = true;
    this.load = false;
    this.data = {...this.resetData};
    this.message = '';

    this.consultService.getDniData(this.filter).subscribe({
      next: (response) => {

        this.loading = false;

        this.load = true;
        if(!response.success){
          this.message = response.message;
          return;
        }

        this.data = response.data;

      },
      error: (error) => {
        console.error('Error fetching DNI data:', error);
        this.loading = false;
        this.load = true;
      }
    });
  }

  onFilterChange(filter: DniFilterRequest) {
    this.filter = filter;
    this.loadData();
  }

}
