import { Component } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '../../../../shared/shared-module';
import { FiltroAdmin } from './filtro-admin/filtro-admin';
import {  DailyReport, EndpointClientFilterRequest, MontlyReport } from '../../../../models/endpoint_client.model';
import { EndpointService } from '../../../../core/services/endpoint/endpoint-service';
import { Data } from '@angular/router';

interface Serie {
  name: string;
  value: number;
}
interface DataReport {
  name: string;
  series: Serie[];
}

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

  monthList: { value: number, name: string }[] = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' },
  ];

  currentMonth: number = new Date().getMonth() + 1;
  diaryReport : DataReport[] = [];
  montlyReport : DataReport[] = [];
  // Example data for single chart

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
        this.montlyReport = this.buildSeries(this.montlyData, 'Mensual', 'monthly');
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
        this.diaryReport = this.buildSeries(this.diaryData, 'Dia', 'daily');
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

  buildSeries( data : any[], name : string, type : string = 'daily' ) : DataReport[] {
    const last = type === 'daily' ? this.obtenerUltimoDiaDelMes(this.filters.year!, this.currentMonth - 1) : 12;
    let series: Serie[] = [];

    for(let val = 1; val <= last; val++){
      const dataItem = data.find( item => {
        if(type === 'daily'){
          return item.day_ === val.toString();
        } else {
          return item.month_ === val.toString();
        }
      });

      series.push({
        name: type == 'daily' ? val.toString() : this.monthName(val.toString()),
        value: dataItem ? dataItem.total : 0
      });
    }

    return [{ name, series }];
  }

  private monthName(number : string): string {
    const monthNumber = parseInt(number, 10);
    const month = this.monthList.find(m => m.value === monthNumber);
    return month ? month.name : '';
  }

  private obtenerUltimoDiaDelMes(año: number, mes: number): number {
    return new Date(año, mes + 1, 0).getDate();
  }

}
