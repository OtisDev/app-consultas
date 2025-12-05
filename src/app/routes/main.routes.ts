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
      allow :['AS']
    }
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('../features/main/clients/clients').then(m => m.Clients),
    data:{
      name:"Clientes",
      icon: 'bi bi-gear',
      allow :['AS','SUP']
    }
  },
  {
    path: 'consulta-dni',
    loadComponent: () =>
      import('../features/main/consult/dni/dni').then(m => m.Dni),
    data:{
      name:"Consulta DNI",
      icon: 'bi bi-gear',
      allow :['all']
    }
  },
  {
    path: 'consulta-ruc',
    loadComponent: () =>
      import('../features/main/consult/ruc/ruc').then(m => m.Ruc),
    data:{
      name:"Consulta RUC",
      icon: 'bi bi-gear',
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
