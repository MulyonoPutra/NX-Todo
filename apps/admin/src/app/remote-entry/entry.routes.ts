import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: 'todo',
    loadComponent: () =>
      import('./../features/todo/todo.component').then((m) => m.TodoComponent),
  },
  {
    path: 'todo-forms',
    loadComponent: () =>
      import('./../features/todo-forms/todo-forms.component').then((m) => m.TodoFormsComponent),
  },
  {
    path: 'todo-update/:id',
    loadComponent: () =>
      import('./../features/todo-forms/todo-forms.component').then((m) => m.TodoFormsComponent),
  },
];
