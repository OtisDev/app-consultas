import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared-module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../../models/user.model';
import { UserService } from '../../../../../core/services/user/user-service';
import Swal from 'sweetalert2';
import { markAllControlsAsTouched } from '../../../../../helpers/utils.helper';
import { Role } from '../../../../../models/role.model';
import { ROLES_MOCKS } from '../../../../../mocks/roles.mocks';

type ModalData = {
  action: 'create' | 'update';
  user?: User;
}

@Component({
  selector: 'app-modal-create-update-user',
  imports: [SharedModule],
  templateUrl: './modal-create-update-user.html',
  styleUrl: './modal-create-update-user.css'
})

export class ModalCreateUpdateUser {
  myForm: FormGroup;
  action: string = 'create';
  titleModal: string = 'Crear Usuario';
  isLoading: boolean = false;
  roles! : Role[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ModalData, private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ModalCreateUpdateUser>
  ) {
    this.action = data.action;
    this.titleModal = data.action === 'create' ? 'Crear Usuario' : 'Actualizar Usuario';
    this.myForm = this.fb.group({
      name: [this.action === 'create' ? '' : data.user?.name, [Validators.required]],
      email: [this.action === 'create' ? '' : data.user?.email, [Validators.required]],
      role: [this.action === 'create' ? '' : data.user?.role, [Validators.required]],
      username: [this.action === 'create' ? '' : data.user?.username, [Validators.required]],
      password: ['', this.action === 'create' ? [Validators.required] : []]
    });

    this.roles = ROLES_MOCKS;
    this.roles.unshift({key: '', name: '-SELECCIONAR-'});
  }

  clickSubmitButton(btnSubmit: HTMLButtonElement) {
    //console.log('Click en botón guardar', btnSubmit);
    btnSubmit.click();
  }

  async onSubmit() {

    console.log(this.myForm.get('DNI')?.invalid && this.myForm.get('DNI')?.touched, 'touched', this.myForm.get('DNI')?.touched, 'invalid', this.myForm.get('DNI')?.invalid);

    markAllControlsAsTouched(this.myForm);

    //return;

    if (this.myForm.valid) {
      const text = this.action === 'create' ? 'Se creará un nuevo usuario.' : 'Se actualizará el usuario existente.';
      const answer = await Swal.fire({
        title: '¿Estás seguro de continuar?',
        text: text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
      });

      if (answer.isConfirmed) {
        if (this.action === 'create') {
          this.createUser();
        }

        if (this.action === 'update') {
          this.updateUser();
        }
      }

    }
  }

  private createUser() {
    this.isLoading = true;
    this.userService.createUser(this.myForm.value).subscribe(response => {

      this.isLoading = false;
      if (!response.success) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          html: response.message
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        html: 'El usuario ha sido creado correctamente.'
      }).then(() => {
        this.dialogRef.close(true);
      });

    }, error => {
      this.isLoading = false;
      Swal.fire("Error", "Error en la comunicacion con el servidor.", "error");
      console.log('Error al crear usuario:', error);
    });
  }

  private updateUser() {
    this.isLoading = true;
    this.userService.updateUser(this.myForm.value).subscribe(response => {

      this.isLoading = false;
      if (!response.success) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          html: response.message
        });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        html: 'El usuario ha sido actualizado correctamente.'
      }).then(() => {
        this.dialogRef.close(true);
      });

    }, error => {
      this.isLoading = false;
      Swal.fire("Error", "Error en la comunicacion con el servidor.", "error");
      console.log('Error al actualizar usuario:', error);
    });
  }

}
