import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DniFilterRequest } from '../../../../../models/dni.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared-module';
import { markAllControlsAsTouched } from '../../../../../helpers/utils.helper';

@Component({
  selector: 'app-filtro-dni',
  imports: [SharedModule],
  templateUrl: './filtro-dni.html',
  styleUrl: './filtro-dni.css'
})
export class FiltroDni {
  @Output() filterChange = new EventEmitter<DniFilterRequest>();
  @Input()loading : boolean = false;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
    });
  }

  onApplyFilter() {
    const formValue = this.myForm.value;
    this.filterChange.emit(formValue);

  }

  resetForm(){
    this.myForm.reset();

    this.onApplyFilter();
  }

  onSubmit(){
    markAllControlsAsTouched(this.myForm);

    if (this.myForm.valid){
      this.onApplyFilter();
    }
  }

  ngOnChanges(){}

}
