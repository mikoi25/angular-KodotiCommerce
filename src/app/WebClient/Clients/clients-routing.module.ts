import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './page/layout-page/layout.component';


import { OrderPageComponent } from './page/order-page/order-page.component';
import { OrderNewComponent } from './page/order-new/order-new.component';
import { OrderDetailsComponent } from './page/order-details/order-details.component';



const routes: Routes = [
  {
    path: '',
    component : LayoutComponent,
    children : [
      { path: 'new-order' , component : OrderNewComponent},
      { path: 'details/:id' , component : OrderDetailsComponent},
      { path: 'order-page' , component : OrderPageComponent},
      { path:'**' , redirectTo:'order-page'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
