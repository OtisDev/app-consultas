import { Component, EventEmitter, Output } from '@angular/core';
import { ClientFilterRequest } from '../../../../models/clients.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-filter-client',
  imports: [SharedModule],
  templateUrl: './filter-client.html',
  styleUrl: './filter-client.css'
})
export class FilterClient {

  @Output() filterChange = new EventEmitter<ClientFilterRequest>();
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ){
    this.myForm = this.fb.group({
      name: [''],
      state : ['']
    });
  }

  ngOnInit(): void {
    this.onApplyFilter();
  }

  onApplyFilter() {
    const formValue = this.myForm.value;
    formValue.page = 1;
    formValue.per_page = 10;

    this.filterChange.emit(formValue);

  }

  resetForm(){
    this.myForm.reset();
    this.myForm.patchValue({
      state: ''
    });
    this.onApplyFilter();
  }

}
