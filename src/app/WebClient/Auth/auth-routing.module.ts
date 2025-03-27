import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './page/layout/layout.component';
import { LoginComponent } from './page/login/login.component';



const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    children: [
      { path: 'login' , component : LoginComponent},
      { path : '**' , redirectTo: 'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
