import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserAssignOfficeProfileRequest, UserOfficeProfile } from '../../../../../models/user.model';
import { UserService } from '../../../../../core/services/user/user-service';
import Swal from 'sweetalert2';
import { AreaServices } from '../../../../../core/services/area/area-services';
import { Area, AreaRequest } from '../../../../../models/area.model';
import { ProfileService } from '../../../../../core/services/profile/profile-service';
import { Profile, ProfileRequest } from '../../../../../models/profile.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-offices-profiles',
  imports: [SharedModule],
  templateUrl: './modal-offices-profiles.html',
  styleUrl: './modal-offices-profiles.css'
})
export class ModalOfficesProfiles {

  myForm: FormGroup;

  isLoading: boolean = false;
  load: boolean = false;
  titleModal: string = '';
  officesData: UserOfficeProfile[] = [];
  officesList: Area[] = [];
  profilesList: Profile[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: User,
    private userService: UserService,
    private officeService: AreaServices,
    private profileService: ProfileService,
    private sanitizer: DomSanitizer,
  ) {
    this.myForm = this.fb.group({
      n_oficina: ['', [Validators.required]],
      profile_id: [0, [Validators.required]],
      usuario_dni: [this.data.DNI]
    });

    this.titleModal = `Asignar Oficina y Perfil a: ${this.data.nom_comp}`;
  }

  ngOnInit() {
    this.loadOfficesProfiles();
    this.getOffices();
    this.getProfiles();
  }

  loadOfficesProfiles() {
    this.load = false;
    this.officesData = [];
    this.userService.getOfficesProfiles(this.data.DNI).subscribe({
      next: (response) => {
        this.load = true;
        this.officesData = response.data;
      },
      error: (error) => {
        this.load = true;
        console.log("Error loading office profiles:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar oficinas y perfiles. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    });

  }

  onSubmit() {
    Swal.fire({
      title: `¿Estás seguro de guardar los cambios?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.assignOfficeProfile();
      }
    });
  }

  validForm():boolean{

    let valid : boolean = true;
    const Values = this.myForm.value;

    let messages: string[] = [];

    if(!Values.n_oficina || Values.n_oficina === ''){
      valid = false;
      messages.push('- El campo Area es obligatorio.');
    }

    if(!Values.profile_id || Values.profile_id.toString() === '0'){
      valid = false;
      messages.push('- El campo Perfil es obligatorio.');
    }

    if (!Values.usuario_dni || Values.usuario_dni === '') {
      valid = false;
      messages.push('- Seleccionar un usuario con DNI valido.');
    }

    if (!valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        html: messages.join(' <br> ')
      });
    }

    return valid;

  }

  close() : boolean{

    return this.officesData.length > 0;
  }

  estado(user: UserOfficeProfile): SafeHtml {
    let color = '';
    let text = '';
    switch (user.state.toString()) {
      case '1':
        color = 'green';
        text = 'Activo';
        break;
      case '0':
        color = 'red';
        text = 'Inactivo';
        break;

    }

    const html = `<span class="badge shade-${color}">${text}</span>`;
    const htmlSeguro: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    return htmlSeguro;
  }

  assignOfficeProfile() {

    if (this.validForm()) {
      const request: UserAssignOfficeProfileRequest = {
        n_oficina: this.myForm.value.n_oficina,
        profile_id: this.myForm.value.profile_id,
        usuario_dni: this.myForm.value.usuario_dni
      };

      this.userService.assignOfficeProfile(request).subscribe({
        next: (response) => {

          if(!response.success){
            Swal.fire({
              icon: 'warning',
              title: 'Atención',
              html: response.message
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Oficina y perfil asignados correctamente.'
          });

          this.loadOfficesProfiles();
        },
        error: (error) => {
          console.log("Error assigning office profile:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al asignar la oficina y el perfil. Por favor, inténtelo de nuevo más tarde.'
          });
        }
      });
    }
  }

  getOffices() {

    const request: AreaRequest = {
      per_page: -1,
      state: 1
    };

    this.officeService.getAreas(request).subscribe({
      next: (response) => {
        this.officesList = response.data;
        this.officesList.unshift({
          n_oficina: '',
          oficina: 'Selecciona un área',
          estado: '',
          rep_datos_completos: '',
          rep_dni: '',
          siglas: ''
        });
      },
      error: (error) => {
        console.log("Error loading offices:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar las oficinas. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    });

  }

  getProfiles() {

    const request: ProfileRequest = {
      per_page: -1,
      state: 1
    };

    this.profileService.getProfiles(request).subscribe({
      next: (response) => {
        this.profilesList = response.data;
        this.profilesList.unshift({
          id: 0,
          name: 'Selecciona un perfil',
          name_key: '',
          state: 1
        });
      },
      error: (error) => {
        console.log("Error loading profiles:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cargar los perfiles. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    });

  }

  updateState(item: UserOfficeProfile) {
    const text = item.state.toString() === '1' ? 'bloqueara' : 'activara';
    const content = `Se ${text} el perfil para el área seleccionada`;
    Swal.fire({
      title: `¿Estás seguro de continuar?`,
      text: content,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actionUpdateState(item);
      }
    });
  }

  private actionUpdateState(item:UserOfficeProfile){
    this.isLoading = true;
    this.userService.updateStateOfficeProfile(item.id, item.state.toString() === '1' ? 0 : 1).subscribe({
      next: (response) => {
        this.isLoading = false;

        if(!response.success){
          Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: response.message
          });
          return;
        }

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El estado del perfil para el área ha sido actualizado correctamente.'
        });
        this.loadOfficesProfiles();
      },
      error: (error) => {
        this.isLoading = false;
        console.log("Error updating state of office profile:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar el estado del perfil para el área. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    });
  }

}
