import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/main/home/home').then(m => m.Home),
    data:{
      name:"Inicio",
      icon: 'bi bi-house',
      allow :['all']
    }
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('../features/main/configuration/users/users').then(m => m.Users),
    data:{
      name:"Usuarios",
      icon: 'bi bi-gear',
      allow :['AS','SUP']
    }
  },
  {
    path: 'denied-access',
    loadComponent: () =>
      import('../features/main/forbidden/forbidden').then(m => m.Forbidden)
  },

];
