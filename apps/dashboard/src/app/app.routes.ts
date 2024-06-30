import { MainComponent } from './core/layout/main.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'charts', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('admin/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'charts',
        loadComponent: () => import('../app/features/charts/charts.component').then((m) => m.ChartsComponent),
      }
    ],
  },



];
