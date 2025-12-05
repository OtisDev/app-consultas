import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EndpointClientFilterRequest } from '../../../../../models/endpoint_client.model';
import { ClientService } from '../../../../../core/services/client/client-service';
import { Client, ClientFilterRequest } from '../../../../../models/clients.model';
import { SharedModule } from '../../../../../shared/shared-module';
import { EndpointService } from '../../../../../core/services/endpoint/endpoint-service';
import { Endpoint, EndpointFilterRequest } from '../../../../../models/endpoint.model';

@Component({
  selector: 'app-filtro-admin',
  imports: [SharedModule],
  templateUrl: './filtro-admin.html',
  styleUrl: './filtro-admin.css'
})
export class FiltroAdmin {

  @Output() filterChange = new EventEmitter<EndpointClientFilterRequest>();
  myForm!: FormGroup;

  yearList: number[] = [];
  clientList : Client[] = [];
  endpointList : Endpoint[] = [];

  currentYear: number = new Date().getFullYear();

  constructor(
    private fb : FormBuilder,
    private clientService : ClientService,
    private endpointService : EndpointService
  ) {
    for(let i = this.currentYear; i >= this.currentYear - 5; i--) {
      this.yearList.push(i);
    }
    this.myForm = this.fb.group({
      year: [this.currentYear],
      client_id: [''],
      endpoint_id: [''],
      endpoint_name: [''],
    });
  }

  ngOnInit() : void {

    this.getClientsList();
    this.getEndpointsList();
    //this.onApplyFilter();
  }

  onApplyFilter() {
    const formValue = this.myForm.value;
    //formValue.page = 1;
    //formValue.per_page = 10;

    this.filterChange.emit(formValue);

  }

  resetForm(){
    this.myForm.reset();
    this.myForm.patchValue({
      year: this.currentYear
    });
    this.onApplyFilter();
  }

  getClientsList(){
    const filter : ClientFilterRequest = {
      state: 1
    };
    this.clientList = [];
    this.clientService.getClientsList(filter).subscribe({
      next: (response) => {
        if(!response.success){
          return;
        }
        this.clientList = response.data;

      },error: (error) => {
        console.error(error);
      }
    });
  }

  getEndpointsList(){
    const filter : EndpointFilterRequest = {
      state : 1
    };
    this.endpointList = [];
    this.endpointService.getAllEndpoints(filter).subscribe({
      next: (response) => {

        this.endpointList = response.data;
        const currentEndpointId : number = this.endpointList.length > 0 ? this.endpointList[0].id : 0;

        let endoint_name = '';
        if(currentEndpointId && this.endpointList.length > 0){
          const endpoint = this.endpointList.find(e => e.id.toString() === currentEndpointId.toString());

          if(endpoint){
            endoint_name = endpoint.name;
          }
        }

        this.myForm.patchValue({
          endpoint_id : currentEndpointId,
          endpoint_name : endoint_name
        });

        this.onApplyFilter()
      },error: (error) => {
        console.error(error);
      }
    });
  }
}
