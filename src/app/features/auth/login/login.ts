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

      this.authService.saveLocalStorage(response.data);
      this.userService.setProfileSession(response.data.user.role)

      this.loading = false;

      Swal.fire("Acceso correcto", "Usuario autenticado correctamente", "success").then(() => {
        this.router.navigate(['/']);
      });

    }, error => {
      Swal.fire("Error", "Error en la comunicacion con el servidor.", "error");
      console.log('Login failed:', error);
      this.loading = false;
    });
  }

  changeValueShowPass() {
    this.showPass = this.showPass ? false : true;
  }

}
