import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { HomeStandard } from './home-standard/home-standard';
import { HomeAdmin } from './home-admin/home-admin';
import { UserService } from '../../../core/services/user/user-service';

@Component({
  selector: 'app-home',
  imports: [SharedModule, HomeStandard,HomeAdmin],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  loading: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private userService : UserService
  ) {
    this.isAdmin = this.userService.isAdmin();
  }

}
