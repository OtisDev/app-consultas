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
    codigo_verificacion: 0,
    photo_url: 'https://placehold.co/150x200?text=00000000',
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
        if(this.data.photo_url == '' || this.data.photo_url == null || this.data.photo_url == undefined){
          this.data.photo_url = `https://placehold.co/150x200?text=${this.data.numero}`;
        }
      },
      error: (error) => {
        console.error('Error fetching DNI data:', error);
        this.loading = false;
        this.load = true;
      }
    });
  }

  onFilterChange(filter: DniFilterRequest) {
    this.data.photo_url = `https://placehold.co/150x200?text=${filter.dni}`;
    this.filter = filter;
    this.loadData();
  }

}
