import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'report',
    loadComponent: () => import('./report/report.component').then((c) => c.ReportComponent),
  },
  {
    path: '**',
    redirectTo: 'report',
  },
];
