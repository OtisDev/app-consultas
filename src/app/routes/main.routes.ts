import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/main/home/home').then(m => m.Home),
    data:{
      name:"Inicio",
      icon: 'bi bi-house'
    }
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('../features/main/configuration/users/users').then(m => m.Users),
    data:{
      name:"Usuarios",
      icon: 'bi bi-gear'
    }
  },

  {
    path: 'clientes',
    loadComponent: () =>
      import('../features/main/configuration/profiles/profiles').then(m => m.Profiles),
    data:{
      name:"Clientes",
      icon: 'bi bi-grid'
    }
  },

  {
    path: 'denied-access',
    loadComponent: () =>
      import('../features/main/forbidden/forbidden').then(m => m.Forbidden)
  },

];
