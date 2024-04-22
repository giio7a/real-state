import {Routes} from '@angular/router';

export const routes: Routes = [{
  path: 'h',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
},
  {
    path: '**',
    redirectTo: 'h'
  }];
