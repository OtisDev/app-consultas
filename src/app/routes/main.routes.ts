import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/main/home/home').then(m => m.Home),
    data:{
      name:"Inicio",
      icon: 'si-home',
      allow :['all']
    }
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('../features/main/configuration/users/users').then(m => m.Users),
    data:{
      name:"Usuarios",
      icon: 'si-user',
      allow :['AS']
    }
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('../features/main/clients/clients').then(m => m.Clients),
    data:{
      name:"Clientes",
      icon: 'si-grid',
      allow :['AS','SUP']
    }
  },
  {
    path: 'consulta-dni',
    loadComponent: () =>
      import('../features/main/consult/dni/dni').then(m => m.Dni),
    data:{
      name:"Consulta DNI",
      icon: 'si-search',
      allow :['all']
    }
  },
  {
    path: 'consulta-ruc',
    loadComponent: () =>
      import('../features/main/consult/ruc/ruc').then(m => m.Ruc),
    data:{
      name:"Consulta RUC",
      icon: 'si-search',
      allow :['all']
    }
  },
  {
    path: 'consulta-nombre',
    loadComponent: () =>
      import('../features/main/consult/nombre/nombre').then(m => m.Nombre),
    data:{
      name:"Consulta por nombre",
      icon: 'si-italic',
      allow :['all']
    }
  },
  /*
  {
    path: 'denied-access',
    loadComponent: () =>
      import('../features/main/forbidden/forbidden').then(m => m.Forbidden)
  },
  */
];
