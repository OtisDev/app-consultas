import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RucFilterRequest } from '../../../../../models/ruc.model';
import { markAllControlsAsTouched } from '../../../../../helpers/utils.helper';
import { SharedModule } from '../../../../../shared/shared-module';

@Component({
  selector: 'app-filtro-ruc',
  imports: [SharedModule],
  templateUrl: './filtro-ruc.html',
  styleUrl: './filtro-ruc.css'
})
export class FiltroRuc {

  @Output() filterChange = new EventEmitter<RucFilterRequest>();
  @Input()loading : boolean = false;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
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
