import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActiveAuth, canMatchAuth } from './WebClient/Auth/guards/auth.guard';
import { canActiveOrder, canMatchOrder } from './WebClient/Auth/guards/order.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./WebClient/Auth/auth.module').then(m => m.AuthModule),
    canActivate: [canActiveAuth],
    canMatch : [canMatchAuth]

  },
  {
    path: 'order',
    loadChildren: () => import('./WebClient/Clients/clients.module').then(m=>m.ClientsModule),
    canActivate : [canActiveOrder],
    canMatch : [canMatchOrder]
  },
  {
    path: '',
    redirectTo : 'auth',
    pathMatch:'full'

  },
  {
    path : '**',
    redirectTo : 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
