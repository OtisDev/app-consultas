import { Routes } from '@angular/router';
import { mainRoutes } from './routes/main.routes';
import { authRoutes } from './routes/auth.routes';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      ...mainRoutes,

    ],
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      ...authRoutes
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
