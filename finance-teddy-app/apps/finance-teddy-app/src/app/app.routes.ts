import { Route } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { PreventHomePageGuard } from './core/guard/prevent-home-page.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [PreventHomePageGuard],
    loadComponent() {
      return import('./features/home/home.component').then(
        (m) => m.HomeComponent
      );
    },
  },
  {
    path: 'clients',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('clientsMfe/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'selectedClients',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('clientsMfe/Routes').then((m) => m!.remoteRoutes),
  },

];
