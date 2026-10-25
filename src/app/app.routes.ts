import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  // auth ro
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then((a) => a.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login-component/login-component').then(
            (l) => l.LoginComponent,
          ),
      },
    ],
  },

  // dashboard
  {
    path: 'dashboard',
    data: {
      roles: ['Admin'],
    },
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/dashboard-layout/dashboard-layout').then((d) => d.DashboardLayout),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        data: { breadcrumb: 'Home' },
        loadComponent: () =>
          import('./features/home/pages/home-component/home-component').then(
            (h) => h.HomeComponent,
          ),
      },

      {
        path: 'students',
        data: {
          breadcrumb: 'Students',
          roles: ['Admin'],
        },
        loadChildren: () =>
          import('./features/students/students.routes').then((s) => s.studentRoutes),
      },

      {
        path: 'payments',
        data: {
          roles: ['Admin'],
        },
        loadComponent: () =>
          import('./features/payments/pages/payment-component/payment-component').then(
            (p) => p.PaymentComponent,
          ),
      },

      {
        path: 'rooms',
        data: {
          breadcrumb: 'Rooms',
          roles: ['Admin'],
        },
        loadComponent: () =>
          import('./features/rooms/pages/room-component/room-component').then(
            (r) => r.RoomComponent,
          ),
      },
    ],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/notFound/not-found-component/not-found-component').then(
        (p) => p.NotFoundComponent,
      ),
  },
  // catch all
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
