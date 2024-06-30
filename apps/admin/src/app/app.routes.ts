import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  // { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('./features/todo/todo.component').then((c) => c.TodoComponent),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
];
