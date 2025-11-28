import { Routes } from '@angular/router';

export const authRoutes : Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/login/login').then(m => m.Login),
    data:{
        name:"Login",
        icon: 'bi bi-house'
    }
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
