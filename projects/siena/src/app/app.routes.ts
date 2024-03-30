import {Routes} from '@angular/router';

export const routes: Routes = [{
  path: 'h',
  loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule)
},
  {
    path: '**',
    redirectTo: 'h'
  }];
