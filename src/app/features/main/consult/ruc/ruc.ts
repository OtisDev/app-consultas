import { Component } from '@angular/core';
import { RucData, RucFilterRequest } from '../../../../models/ruc.model';
import { ConsultService } from '../../../../core/services/consult/consult-service';
import { FiltroRuc } from './filtro-ruc/filtro-ruc';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-ruc',
  imports: [FiltroRuc, SharedModule],
  templateUrl: './ruc.html',
  styleUrl: './ruc.css'
})
export class Ruc {

  loading : boolean = false;
  load : boolean = false;
  filter! : RucFilterRequest;
  message : string = '';

  data: RucData = {} as RucData;

  resetData : RucData = {
    direccion: '',
    direccion_completa: '',
    ruc: '',
    nombre_o_razon_social: '',
    estado: '',
    condicion: '',
    departamento: '',
    provincia: '',
    distrito: '',
    ubigeo_sunat: '',
    es_agente_de_retencion: '',
    es_agente_de_percepcion: '',
    es_agente_de_percepcion_combustible: '',
    es_buen_contribuyente: '',
  }

  constructor(
    private consultService : ConsultService
  ){
    this.data = {...this.resetData};
  }

  loadData() {
    this.loading = true;
    this.load = false;
    this.data = {...this.resetData};

    this.consultService.getRucData(this.filter).subscribe({
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
        console.error('Error fetching RUC data:', error);
        this.loading = false;
        this.load = true;
      }
    });
  }

  onFilterChange(filter: RucFilterRequest) {
    this.filter = filter;
    this.loadData();
  }

}
