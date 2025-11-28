import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpedientRequest } from '../../../../models/expedient.model';
import { AreaServices } from '../../../../core/services/area/area-services';
import { Area } from '../../../../models/area.model';
import { UserR } from '../../../../models/user.model';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { UserService } from '../../../../core/services/user/user-service';

interface ButtonFilter {
  checked: boolean;
  group: number;
  label: string;
  class: string;
}

@Component({
  selector: 'app-filtro',
  imports: [SharedModule],
  templateUrl: './filtro.html',
  styleUrl: './filtro.css'
})
export class Filtro {

  @Output() filterChange = new EventEmitter<ExpedientRequest>();
  @Output() clickReport = new EventEmitter<boolean>();
  @ViewChildren('btn') buttons!: QueryList<ElementRef<HTMLButtonElement>>;

  myForm: FormGroup;

  topYear: number = new Date().getFullYear();
  years: number[] = [];
  areas: Area[] = [];
  user: UserR = {} as UserR;
  isAdmin: boolean = false;
  isAuthorized: boolean = false;
  disabled: boolean = false;
  check: boolean = false;
  showBtn: boolean = false;
  profile!: string;
  office!: string;

  selectedArea: string = '';

  buttonsArray: ButtonFilter[] = [
    { group: 0, label: 'Todos', class: 'light', checked: true },
    { group: 1, label: 'Sin enviar', class: 'secondary', checked: false },
    { group: 2, label: 'Enviado', class: 'primary' , checked: false },
    { group: 3, label: 'Resuelto', class: 'success' , checked: false },
    { group: 4, label: 'Anulado', class: 'danger', checked: false },
  ];

  constructor(
    private fb: FormBuilder,
    private areaService: AreaServices,
    private authService: AuthService,
    private userService: UserService
  ) {

    this.user = this.authService.user;

    this.myForm = this.fb.group({
      anio: [this.topYear.toString(), Validators.required],
      codigo: [''],
      areaId: [''],
      n_solicitante: [''],
      asunto: [''],
      unsolved: [0],
      group: [0],
    });

    this.init();

  }

  private init() {
    this.profile = this.userService.getProfileKey();
    this.office = this.userService.getActiveOffice();

    this.isAdmin = this.userService.isAdmin();
    this.isAuthorized = this.userService.isAuthorized();

    let areaId = '';
    if (this.user.offices_profiles && this.user.offices_profiles.length > 0) {
      areaId = this.isAuthorized ? '0' : this.office.toString();
    }
    //console.log('Area ID set to:', areaId, this.isAuthorized, this.user.offices_profiles);

    this.myForm.patchValue({
      areaId: areaId,
      group_name: this.buttonsArray.find(b => b.group === this.myForm.value.group)?.label || ''
    });
  }

  ngOnInit(): void {
    this.onApplyFilter();
    this.loadYears();
    //this.loadOffices();
  }

  onApplyFilter(download: boolean = false) {
    const formValue = this.myForm.value;
    formValue.page = 1;
    formValue.per_page = 10;
    formValue.downloadUnsolved = download;
    formValue.group_name = this.buttonsArray.find(b => b.group === formValue.group)?.label || '';

    this.filterChange.emit(formValue);
    this.showBtn = this.check && this.isAdmin;
  }

  private loadYears() {
    for (let i = this.topYear; i >= 2000; i--) {
      this.years.push(i);
    }
  }

  private loadOffices() {
    this.areaService.getAreas({ name: '' }).subscribe(response => {
      this.areas = response.data;

    });
  }

  onDownloadReport() {
    this.onApplyFilter(true);
  }

  setFocus(group: number): void {

    this.myForm.patchValue({
      unsolved: 0
    });

    if (group === 1) {
      this.myForm.patchValue({
        unsolved: 1
      });
    }

    this.myForm.patchValue({
      group: group
    });

  }

  resetForm(){
    this.myForm.reset({
      anio: this.topYear.toString(),
    });
    this.unCheckButtons();
    this.onApplyFilter();
  }

  private unCheckButtons(){
    this.buttonsArray = this.buttonsArray.map((btn, index) => {
      return {
        ...btn,
        checked: index === 0
      };
    });

  }

}
