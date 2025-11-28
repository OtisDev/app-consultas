import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth-service';
import { UserLoginRequest, UserPermisionsRequest } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user-service';
import { Menu } from '../../../models/menu-item.model';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loading: boolean = false
  myForm!: FormGroup;
  showPass: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required]], //
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    const request: UserLoginRequest = this.myForm.value;
    this.loading = true;
    this.authService.login(request).subscribe(response => {

      if (!response.success) {
        this.loading = false;
        Swal.fire("Error", response.message, "error");
        return;
      }
      const offices = response.data.user.offices_profiles ?? [];

      if (offices.length == 0) {
        this.loading = false;
        Swal.fire("Error", "El usuario no tiene oficinas asignadas. Contacte con el administrador.", "error");
        return;
      }

      this.authService.saveLocalStorage(response.data);

      const permisionRequest: UserPermisionsRequest = {
        n_oficina: offices[0].n_oficina,
        profile_id: offices[0].profile_id
      }
      this.userService.setProfileSession(offices[0]);
      this.authService.saveOfficesProfiles(offices);
      this.getPermisionsModules(permisionRequest, true);

    }, error => {
      Swal.fire("Error", "Error en la comunicacion con el servidor.", "error");
      console.log('Login failed:', error);
      this.loading = false;
    });
  }

  changeValueShowPass() {
    this.showPass = this.showPass ? false : true;
  }

  getPermisionsModules(permisionRequest: UserPermisionsRequest, isLogin: boolean = false) {
    this.userService.getPermisionsModules(permisionRequest).subscribe(response => {
      if (!response.success) {
        this.loading = false;
        Swal.fire("Error", response.message, "error");
        return;
      }

      const modules : Menu[] = response.data;
      if (isLogin) {
        this.loading = false;
        this.authService.savePermissions(modules);
        Swal.fire("Acceso correcto", "Usuario autenticado correctamente", "success").then(() => {
          this.router.navigate(['/']);
        });
      }
    }, error => {
      this.loading = false;
      Swal.fire("Error", "Error en la comunicacion con el servidor.", "error");
      console.log('Error al obtener permisos de módulos:', error);
    });
  }

}
