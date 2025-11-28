import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileRequest } from '../../../../../models/profile.model';
import { SharedModule } from '../../../../../shared/shared-module';

@Component({
  selector: 'app-filtro-profile',
  imports: [SharedModule],
  templateUrl: './filtro-profile.html',
  styleUrl: './filtro-profile.css'
})
export class FiltroProfile {

  @Output() filterChange = new EventEmitter<ProfileRequest>();
  myForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.myForm = this.fb.group({
      name: [''],
      state: [''],
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

}
