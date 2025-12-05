import { Component } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../../../../shared/shared-module';
import { FiltroAdmin } from './filtro-admin/filtro-admin';
import {  DailyReport, EndpointClientFilterRequest, MontlyReport } from '../../../../models/endpoint_client.model';
import { EndpointService } from '../../../../core/services/endpoint/endpoint-service';

@Component({
  selector: 'app-home-admin',
  imports: [SharedModule, NgxChartsModule, FiltroAdmin],
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css'
})
export class HomeAdmin {
  filters ! : EndpointClientFilterRequest;
  isLoading : boolean = false;
  diaryData : DailyReport[] = [];
  montlyData : MontlyReport[] = [];
  message : string[] = [];

  monthList: { value: string, name: string }[] = [
    { value: '01', name: 'Enero' },
    { value: '02', name: 'Febrero' },
    { value: '03', name: 'Marzo' },
    { value: '04', name: 'Abril' },
    { value: '05', name: 'Mayo' },
    { value: '06', name: 'Junio' },
    { value: '07', name: 'Julio' },
    { value: '08', name: 'Agosto' },
    { value: '09', name: 'Septiembre' },
    { value: '10', name: 'Octubre' },
    { value: '11', name: 'Noviembre' },
    { value: '12', name: 'Diciembre' },
  ];

  currentMonth: string = new Date().toISOString().slice(5, 7);

  single: any[] = [
    {
      "name": "Ventas",
      "series": [
        {
          "name": "Enero",
          "value": 65
        },
        {
          "name": "Febrero",
          "value": 59
        },
        {
          "name": "Marzo",
          "value": 80
        },
        {
          "name": "Abril",
          "value": 81
        },
        {
          "name": "Mayo",
          "value": 56
        }
      ]
    }
  ];

  constructor(
    private endpointService: EndpointService
  ) {

  }

  onFilterChange(filters: EndpointClientFilterRequest) {
    this.filters = filters;
    this.filters.month = this.currentMonth;
    //this.filters.endpoint_name = this.filters.endpoint_name ?? '';
    //console.log(this.filters);
    this.loadData();
  }

  loadData(){
    this.getMontlyReport();
    this.getDailyReport();
  }

  private getMontlyReport(){
    this.isLoading = true;
    this.montlyData = [];
    this.endpointService.getMonthlyReport(this.filters).subscribe({
      next: (response) => {

        this.montlyData = response.data;
        if(this.montlyData.length === 0 && !response.success){
          this.message.push(response.message);
        }
        this.isLoading = false;
      },error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  private getDailyReport(){
    this.isLoading = true;
    this.diaryData = [];
    this.endpointService.getDailyReport(this.filters).subscribe({
      next: (response) => {
        this.diaryData = response.data;
        if(this.diaryData.length === 0 && !response.success){
          this.message.push(response.message);
        }
        this.isLoading = false;
      },error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  onClickMonthChange(){
    this.filters.month = this.currentMonth;
    this.loadData();
  }

}
