import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { markAllControlsAsTouched } from '../../../../helpers/utils.helper';
import Swal from 'sweetalert2';
import { ClientService } from '../../../../core/services/client/client-service';
import { Client } from '../../../../models/clients.model';

type Action = 'create' | 'update';
type ModalData = {
  action: Action;
  client?: Client;
}

@Component({
  selector: 'app-modal-create-update-client',
  imports: [SharedModule],
  templateUrl: './modal-create-update-client.html',
  styleUrl: './modal-create-update-client.css'
})
export class ModalCreateUpdateClient {

  isLoading : boolean = false;
  action : Action = 'create';
  titleModal : string = 'Crear Cliente';
  myForm !: FormGroup;
  client! : Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private dialogRef: MatDialogRef<ModalCreateUpdateClient>,
    private fb: FormBuilder,
    private clientService: ClientService
  ) {

    this.action = this.data.action;
    if(this.action === 'update' && data.client){
      this.client = data.client;
    }

    this.myForm = this.fb.group({
      name: [this.data.action === 'create' ? '' : this.data.client!.name],
    });

    this.titleModal = this.action === 'create' ? 'Crear Cliente' : 'Actualizar Cliente';
  }

  clickSubmitButton(btnSubmit: HTMLButtonElement) {
    btnSubmit.click();
  }

  async onSubmit() {

      markAllControlsAsTouched(this.myForm);

      if (this.myForm.valid) {
        const text = this.action === 'create' ? 'Se creará un nuevo cliente.' : 'Se actualizará el cliente existente.';
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
            this.createClient();
          }

          if (this.action === 'update') {
            this.updateClient();
          }
        }

      }
    }

    private createClient() {
      this.isLoading = true;
      this.clientService.createClient(this.myForm.value).subscribe(response => {

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
          html: 'El cliente ha sido creado correctamente.'
        }).then(() => {
          this.dialogRef.close(true);
        });

      }, error => {
        this.isLoading = false;
        Swal.fire("Error", "Error en la comunicacion con el servidor.", "error");
        console.log('Error al crear cliente:', error);
      });
    }

    private updateClient() {
      this.isLoading = true;
      const id : number = this.client.id;
      this.clientService.updateClient(this.myForm.value, id).subscribe(response => {

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
          html: 'El cliente ha sido actualizado correctamente.'
        }).then(() => {
          this.dialogRef.close(true);
        });

      }, error => {
        this.isLoading = false;
        Swal.fire("Error", "Error en la comunicacion con el servidor.", "error");
        console.log('Error al actualizar cliente:', error);
      });
    }

}
