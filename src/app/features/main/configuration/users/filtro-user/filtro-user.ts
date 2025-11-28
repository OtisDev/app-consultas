import { Component, EventEmitter, Output } from '@angular/core';
import { UsersRequest } from '../../../../../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared-module';

@Component({
  selector: 'app-filtro-user',
  imports: [SharedModule],
  templateUrl: './filtro-user.html',
  styleUrl: './filtro-user.css'
})
export class FiltroUser {
  @Output() filterChange = new EventEmitter<UsersRequest>();
  myForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.myForm = this.fb.group({
      dni: [''],
      apepaterno: [''],
      apematerno: [''],
      nombres: [''],
      nivel: [''],
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
    this.onApplyFilter();
  }
}
