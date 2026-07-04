import { Routes } from '@angular/router';

export const studentRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/student-list/student-component').then((s) => s.StudentComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/student-details/student-details').then((s) => s.StudentDetails),
  },
];
